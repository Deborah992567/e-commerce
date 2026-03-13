from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.order import OrderCreate
from app.services.order_service import calculate_order_total
from app.services.email_service import send_order_email
from app.models.order import Order
from app.Tasks.email_tasks import send_order_receipt
from app.Tasks.analytics_tasks import cache_analytics
from fastapi import HTTPException   

router = APIRouter()

@router.post("/")
def create_order(
    data: OrderCreate,
    background_tasks: BackgroundTasks,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if len(data.product_ids) != len(data.quantities):
        raise HTTPException(status_code=400, detail="product_ids and quantities must have same length")
    
    if any(q <= 0 for q in data.quantities):
        raise HTTPException(status_code=400, detail="Quantities must be positive")

    total = calculate_order_total(
        data.product_ids,
        data.quantities,
        data.discount_code,
        db
    )

    order = Order(user_id=user.id, total_amount=total)
    db.add(order)
    db.commit()

    # Send order confirmation email (async)
    try:
        send_order_email.delay(user.email, order.id)
    except Exception:
        # Email sending failed, but order was created successfully
        pass

    return {"order_id": order.id, "total": total}

@router.get("/track/{order_id}")
def track_order(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == user.id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    return {"status": order.status}
