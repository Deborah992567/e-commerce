from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.models.product import Product
from app.services.analytics_service import cache_product_view
from fastapi import UploadFile, File
from app.models.product_image import ProductImage
from app.services.upload_service import upload_product_image
from app.models.category import Category

router = APIRouter()

@router.get("/")
def list_products(
    q: str | None = Query(None),
    category: str | None = Query(None),
    min_price: float | None = None,
    max_price: float | None = None,
    sort: str | None = Query(None, description="price_asc, price_desc, rating, newest"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Product)

    if q:
        query = query.filter(Product.name.ilike(f"%{q}%"))
    if category:
        query = query.join(Category).filter(Category.name.ilike(category))
    if min_price:
        query = query.filter(Product.price >= min_price)
    if max_price:
        query = query.filter(Product.price <= max_price)

    if sort == "price_asc":
        query = query.order_by(Product.price.asc())
    elif sort == "price_desc":
        query = query.order_by(Product.price.desc())
    elif sort == "rating":
        query = query.order_by(Product.avg_rating.desc())
    elif sort == "newest":
        query = query.order_by(Product.id.desc())

    total = query.count()
    products = query.offset((page - 1) * page_size).limit(page_size).all()
    return {"total": total, "page": page, "page_size": page_size, "items": products}

@router.get("/categories")
def list_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).order_by(Category.name.asc()).all()
    return [
        {"id": c.id, "name": c.name}
        for c in categories
    ]

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
        url=image_url
    )
    db.add(image)
    db.commit()
    return {"message": "Image uploaded", "url": image_url}