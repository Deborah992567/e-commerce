from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.models.review import Review

def get_product_rating(product_id: int, db: Session):
    avg_rating = (
        db.query(func.avg(Review.rating))
        .filter(Review.product_id == product_id)
        .scalar()
    )

    return round(avg_rating or 0, 1)
