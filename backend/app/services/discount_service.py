from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.discount import Discount

def validate_discount(code: str, total_amount: float, db: Session):
    discount = (
        db.query(Discount)
        .filter(Discount.code == code, Discount.is_active == True)
        .first()
    )

    if not discount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid discount code"
        )

    if discount.expires_at and discount.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount code expired"
        )

    # Assuming value is percentage, and no minimum_amount in model
    return discount
