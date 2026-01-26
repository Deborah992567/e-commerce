from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.services.analytics_service import get_product_views

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
