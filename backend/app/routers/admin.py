from fastapi import APIRouter, Depends
from app.dependencies.auth import admin_required, get_current_user
from app.services.analytics_service import get_product_views
from app.dependencies.database import get_db
from app.services.analytics_service import get_order_stats
from app.dependencies.auth import get_current_admin_user
from sqlalchemy.orm import Session

from app.services.analytics_service import revenue_stats


from backend.app.models.order import Order
from backend.app.models.product import Product
from backend.app.models.user import User
from backend.app.services.admin_service import get_admin_stats
router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(admin_required)]
)

@router.get("/product/{product_id}/views")
async def product_views(
    product_id: int,
    user=Depends(get_current_user)
):
    if user.role != "admin":
        return {"error": "Unauthorized"}

    views = await get_product_views(product_id)
    return {"views": views}

@router.get("/analytics/orders")
async def order_stats(
    db=Depends(get_db),
    admin=Depends(get_current_admin_user)
):
    return await get_order_stats(db)

@router.get("/dashboard")
async def dashboard(db: Session = Depends(get_db)):
    return await get_admin_stats(db)


@router.get("/users")
async def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/orders")
async def list_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()


@router.get("/products")
async def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.get("/revenue")
async def revenue(db: Session = Depends(get_db)):
    return await revenue_stats(db)
