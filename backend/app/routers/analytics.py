from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.auth import admin_required
from app.services.analytics_service import get_cached_stats, get_product_views, revenue_stats

router = APIRouter()

@router.get("/orders", dependencies=[Depends(admin_required)])
def order_stats():
    return get_cached_stats()

@router.get("/product/{product_id}/views", dependencies=[Depends(admin_required)])
def product_views(product_id: int):
    views = get_product_views(product_id)
    return {"views": views}

@router.get("/revenue", dependencies=[Depends(admin_required)])
def revenue_analytics(db: Session = Depends(get_db)):
    return revenue_stats(db)