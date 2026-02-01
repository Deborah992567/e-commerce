from sqlalchemy.orm import Session
from app.models.user import User
from app.models.order import Order
from app.models.product import Product

async def get_admin_stats(db: Session):
    return {
        "total_users": db.query(User).count(),
        "total_orders": db.query(Order).count(),
        "total_products": db.query(Product).count(),
    }
