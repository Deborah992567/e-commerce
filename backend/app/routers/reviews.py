from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.models.review import Review
from app.models.product import Product
from app.models.user import User
from app.schemas.review import ReviewCreate
from app.services.review_service import get_product_rating

router = APIRouter()

@router.post("/")
def create_review(
    data: ReviewCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    review = Review(
        user_id=user.id,
        product_id=data.product_id,
        rating=data.rating,
        comment=data.comment
    )
    db.add(review)
    db.commit()

    # Recompute average rating for product
    avg = get_product_rating(data.product_id, db)
    product.avg_rating = avg
    db.commit()

    return {"message": "Review added", "review_id": review.id}

@router.get("/product/{product_id}")
def product_reviews(product_id: int, db: Session = Depends(get_db)):
    avg = get_product_rating(product_id, db)
    rows = (
        db.query(Review, User)
        .join(User, Review.user_id == User.id)
        .filter(Review.product_id == product_id)
        .order_by(Review.id.desc())
        .all()
    )
    items = []
    for review, user in rows:
        items.append({
            "id": review.id,
            "product_id": review.product_id,
            "user_id": review.user_id,
            "author": user.email,
            "rating": review.rating,
            "comment": review.comment,
            "title": None,
            "date": None,
            "helpful": 0,
            "verified": True,
        })
    return {"average_rating": avg, "reviews": items}
