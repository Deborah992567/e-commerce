from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.discount import DiscountCode

def validate_discount(code: str, total_amount: float, db: Session):
    discount = (
        db.query(DiscountCode)
        .filter(DiscountCode.code == code, DiscountCode.is_active == True)
        .first()
    )

    if not discount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid discount code"
        )

    if discount.expiry_date and discount.expiry_date < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount code expired"
        )

    if total_amount < discount.minimum_amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order amount too low for this discount"
        )

    return discount
