from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.models.product import Product
from app.services.analytics_service import cache_product_view

router = APIRouter()

@router.get("/")
def list_products(
    q: str | None = Query(None),
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)

    if q:
        query = query.filter(Product.name.ilike(f"%{q}%"))
    if min_price:
        query = query.filter(Product.price >= min_price)
    if max_price:
        query = query.filter(Product.price <= max_price)

    return query.all()

@router.get("/{product_id}")
async def get_product(product_id: int, db: Session = Depends(get_db)):
    await cache_product_view(product_id)
    return db.query(Product).filter(Product.id == product_id).first()
