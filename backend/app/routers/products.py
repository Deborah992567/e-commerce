from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.models.product import Product
from app.services.analytics_service import cache_product_view
from fastapi import UploadFile, File
from app.services.cloudinary_service import upload_image
from app.core.database import async_session
from app.models.product_image import ProductImage

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


@router.post("/{product_id}/upload-image")
async def upload_product_image(product_id: int, file: UploadFile = File(...)):
    file_data = await file.read()
    url = upload_image(file_data)

    async with async_session() as session:
        image = ProductImage(product_id=product_id, url=url)
        session.add(image)
        await session.commit()

    return {"url": url}
