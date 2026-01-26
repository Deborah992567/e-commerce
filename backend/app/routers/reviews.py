from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.models.review import Review
from app.schemas.review import ReviewCreate
from app.services.review_service import get_product_rating

router = APIRouter()

@router.post("/")
def create_review(
    data: ReviewCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    review = Review(
        user_id=user.id,
        product_id=data.product_id,
        rating=data.rating,
        comment=data.comment
    )
    db.add(review)
    db.commit()
    return {"message": "Review added"}

@router.get("/product/{product_id}")
def product_reviews(product_id: int, db: Session = Depends(get_db)):
    rating = get_product_rating(product_id, db)
    return {"average_rating": rating}
