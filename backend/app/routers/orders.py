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
from backend.app.models import order, user





router = APIRouter()

@router.post("/")
def create_order(
    data: OrderCreate,
    background_tasks: BackgroundTasks,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total = calculate_order_total(
        data.product_ids,
        data.quantities,
        data.discount_code,
        db
    )

    order = Order(user_id=user.id, total_amount=total)
    db.add(order)
    db.commit()

    send_order_email(background_tasks, user.email, order.id)

    return {"order_id": order.id, "total": total}




send_order_receipt.delay(order.id, user.email)
cache_analytics.delay()