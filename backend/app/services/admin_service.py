from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.order import Order, OrderStatus
from app.models.product import Product

def get_admin_stats(db: Session):
    total_revenue = db.query(func.sum(Order.total_amount)).scalar() or 0
    total_orders = db.query(Order).count()
    pending_orders = (
        db.query(Order)
        .filter(Order.status.in_([OrderStatus.PENDING, OrderStatus.CONFIRMED]))
        .count()
    )
    low_stock_products = db.query(Product).filter(Product.stock <= 5).count()
    return {
        "total_users": db.query(User).count(),
        "total_orders": total_orders,
        "total_products": db.query(Product).count(),
        "total_revenue": float(total_revenue),
        "avg_order_value": round(float(total_revenue) / total_orders, 2) if total_orders else 0,
        "pending_orders": pending_orders,
        "low_stock_products": low_stock_products,
    }
