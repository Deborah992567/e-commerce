from pydantic import BaseModel

class DiscountCreate(BaseModel):
    code: str
    value: float
    max_uses: int | None = 1

class DiscountOut(BaseModel):
    id: int
    code: str
    value: float
    is_active: bool
    max_uses: int
    uses: int

    class Config:
        orm_mode = True
