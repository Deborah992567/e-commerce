from pydantic import BaseModel
from datetime import datetime

class DiscountCreate(BaseModel):
    code: str
    percentage: float
    max_uses: int | None = 1
    expires_at: datetime | None = None

class DiscountUpdate(BaseModel):
    code: str | None = None
    percentage: float | None = None
    is_active: bool | None = None
    max_uses: int | None = None
    expires_at: datetime | None = None

class DiscountOut(BaseModel):
    id: int
    code: str
    percentage: float
    is_active: bool
    max_uses: int
    uses: int
    expires_at: datetime | None

    class Config:
        orm_mode = True
