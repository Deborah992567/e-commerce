from pydantic import BaseModel
from typing import List, Optional

class ProductImageOut(BaseModel):
    id: int
    url: str

    class Config:
        orm_mode = True

class ProductOut(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    stock: int
    avg_rating: float
    category_id: int
    images: List[ProductImageOut] = []

    class Config:
        orm_mode = True
