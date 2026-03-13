from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.auth import admin_required
from app.services.analytics_service import get_order_stats, get_product_views, revenue_stats

router = APIRouter()

@router.get("/orders", dependencies=[Depends(admin_required)])
async def order_stats(db: Session = Depends(get_db)):
    return await get_order_stats(db)

@router.get("/product/{product_id}/views", dependencies=[Depends(admin_required)])
async def product_views(product_id: int):
    views = await get_product_views(product_id)
    return {"views": views}

@router.get("/revenue", dependencies=[Depends(admin_required)])
async def revenue_analytics(db: Session = Depends(get_db)):
    return await revenue_stats(db)