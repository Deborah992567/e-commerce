from pydantic import BaseModel, Field
from typing import List
from app.models.order import OrderStatus

class OrderCreate(BaseModel):
    product_ids: List[int] = Field(..., min_items=1)
    quantities: List[int] = Field(..., min_items=1)
    discount_code: str | None = None

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderStatusUpdate(BaseModel):
    status: OrderStatus

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
