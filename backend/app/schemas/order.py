from pydantic import BaseModel
from typing import List

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    discount_code: str | None = None

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float

    class Config:
        orm_mode = True

class OrderOut(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    items: List[OrderItemOut] = []

    class Config:
        orm_mode = True
