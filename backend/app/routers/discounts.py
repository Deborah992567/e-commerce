from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.models.discount import Discount
from app.schemas.discount import DiscountCreate, DiscountUpdate
from app.dependencies.auth import admin_required

router = APIRouter()

@router.get("/")
def list_discounts(db: Session = Depends(get_db)):
    return db.query(Discount).all()

@router.post("/", dependencies=[Depends(admin_required)])
def create_discount(data: DiscountCreate, db: Session = Depends(get_db)):
    discount = Discount(**data.dict())
    db.add(discount)
    db.commit()
    db.refresh(discount)
    return discount

@router.get("/{discount_id}")
def get_discount(discount_id: int, db: Session = Depends(get_db)):
    discount = db.query(Discount).filter(Discount.id == discount_id).first()
    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")
    return discount

@router.put("/{discount_id}", dependencies=[Depends(admin_required)])
def update_discount(discount_id: int, data: DiscountUpdate, db: Session = Depends(get_db)):
    discount = db.query(Discount).filter(Discount.id == discount_id).first()
    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(discount, key, value)
    db.commit()
    db.refresh(discount)
    return discount

@router.delete("/{discount_id}", dependencies=[Depends(admin_required)])
def delete_discount(discount_id: int, db: Session = Depends(get_db)):
    discount = db.query(Discount).filter(Discount.id == discount_id).first()
    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")
    db.delete(discount)
    db.commit()
    return {"message": "Discount deleted"}