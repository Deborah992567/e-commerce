from sqlalchemy.orm import Session
from app.models.product import Product
from app.services.discount_service import validate_discount

def calculate_order_total(
    product_ids: list[int],
    quantities: list[int],
    discount_code: str | None,
    db: Session
):
    total = 0

    for pid, qty in zip(product_ids, quantities):
        product = db.query(Product).filter(Product.id == pid).first()
        total += product.price * qty

    if discount_code:
        discount = validate_discount(discount_code, total, db)
        total -= (discount.percentage / 100) * total

    return round(total, 2)
