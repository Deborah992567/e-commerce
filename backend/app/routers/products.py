from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.models.product import Product
from app.services.analytics_service import cache_product_view
from fastapi import UploadFile, File
from app.services.cloudinary_service import upload_image
from app.models.product_image import ProductImage
from app.services.upload_service import upload_product_image

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
def get_product(product_id: int, db: Session = Depends(get_db)):
    cache_product_view(product_id)
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/{product_id}/upload-image")
async def upload_image(
    product_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG, PNG, WebP allowed.")
    
    # Validate file size (5MB max)
    max_size = 5 * 1024 * 1024
    file_content = await file.read()
    if len(file_content) > max_size:
        raise HTTPException(status_code=400, detail="File too large. Max 5MB.")
    
    image_url = await upload_product_image(file_content, file.filename)

    image = ProductImage(
        product_id=product_id,
        image_url=image_url
    )
    db.add(image)
    db.commit()
    return {"message": "Image uploaded", "url": image_url}

    db.add(image)
    db.commit()

    return {"image_url": image_url}