from pydantic import BaseModel, Field

class ReviewCreate(BaseModel):
    product_id: int
    rating: float = Field(..., ge=1, le=5)
    comment: str | None = None

class ReviewOut(BaseModel):
    id: int
    product_id: int
    rating: float
    comment: str | None

    class Config:
        orm_mode = True
