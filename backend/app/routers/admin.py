from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.services.analytics_service import get_product_views
from app.dependencies.database import get_db
from app.services.analytics_service import get_order_stats
from app.dependencies.auth import get_current_admin_user

router = APIRouter()

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