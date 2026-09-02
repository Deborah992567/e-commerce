from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.auth import admin_required
from app.services.analytics_service import get_cached_stats, get_product_views, revenue_stats
from app.models.order_item import OrderItem
from app.models.product import Product

router = APIRouter()

@router.get("/orders", dependencies=[Depends(admin_required)])
def order_stats():
    return get_cached_stats()

@router.get("/top-products", dependencies=[Depends(admin_required)])
def top_products(
    limit: int = 5,
    db: Session = Depends(get_db),
):
    rows = (
        db.query(
            Product.id,
            Product.name,
            Product.price,
            func.sum(OrderItem.quantity).label("units_sold"),
        )
        .join(OrderItem, OrderItem.product_id == Product.id)
        .group_by(Product.id)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(limit)
        .all()
    )
    return [
        {
            "id": pid,
            "name": name,
            "price": float(price),
            "units_sold": int(units_sold or 0),
        }
        for pid, name, price, units_sold in rows
    ]

@router.get("/product/{product_id}/views", dependencies=[Depends(admin_required)])
def product_views(product_id: int):
    views = get_product_views(product_id)
    return {"views": views}

@router.get("/revenue", dependencies=[Depends(admin_required)])
def revenue_analytics(db: Session = Depends(get_db)):
    return revenue_stats(db)