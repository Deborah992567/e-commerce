from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.order import OrderCreate
from app.services.order_service import calculate_order_total
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.payment import Payment
from app.Tasks.email_tasks import send_order_receipt
from app.models.product import Product
from datetime import datetime

router = APIRouter()

@router.post("/")
def create_order(
    data: OrderCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if len(data.product_ids) != len(data.quantities):
        raise HTTPException(status_code=400, detail="product_ids and quantities must have same length")

    if any(q <= 0 for q in data.quantities):
        raise HTTPException(status_code=400, detail="Quantities must be positive")

    # Validate products exist and have enough stock
    for pid, qty in zip(data.product_ids, data.quantities):
        product = db.query(Product).filter(Product.id == pid).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {pid} not found")
        if product.stock < qty:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")

    total = calculate_order_total(
        data.product_ids,
        data.quantities,
        data.discount_code,
        db
    )

    order = Order(user_id=user.id, total_amount=total)
    db.add(order)
    db.flush()

    # Create order items and decrement stock
    for pid, qty in zip(data.product_ids, data.quantities):
        product = db.query(Product).filter(Product.id == pid).first()
        db.add(OrderItem(
            order_id=order.id,
            product_id=pid,
            quantity=qty,
            unit_price=product.price,
        ))
        product.stock -= qty

    # Simulated payment — always marked paid for demo
    db.add(Payment(
        order_id=order.id,
        amount=total,
        status="paid",
        paid_at=datetime.utcnow(),
    ))

    db.commit()

    # Send order confirmation email (async)
    try:
        send_order_receipt.delay(order.id, user.email)
    except Exception:
        # Email sending failed, but order was created successfully
        pass

    return {"order_id": order.id, "total": total, "status": order.status.value}

@router.get("/track/{order_id}")
def track_order(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == user.id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    return {"status": order.status.value, "total": order.total_amount, "created_at": order.created_at}

@router.get("/{order_id}")
def get_order_detail(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == user.id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    items = []
    for i in order.items:
        product = i.product
        image_url = product.images[0].url if product and product.images else None
        items.append({
            "product_id": i.product_id,
            "quantity": i.quantity,
            "unit_price": i.unit_price,
            "name": product.name if product else None,
            "image": image_url,
        })
    return {
        "id": order.id,
        "total_amount": order.total_amount,
        "status": order.status.value,
        "created_at": order.created_at,
        "items": items,
    }

@router.get("/")
def list_orders(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == user.id)
        .order_by(Order.created_at.desc())
        .all()
    )
    result = []
    for o in orders:
        items = []
        for i in o.items:
            product = i.product
            image_url = product.images[0].url if product and product.images else None
            items.append({
                "product_id": i.product_id,
                "quantity": i.quantity,
                "unit_price": i.unit_price,
                "name": product.name if product else None,
                "image": image_url,
            })
        result.append({
            "id": o.id,
            "total_amount": o.total_amount,
            "status": o.status.value,
            "created_at": o.created_at,
            "items": items,
        })
    return result
