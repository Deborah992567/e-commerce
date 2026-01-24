from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from app.core.database import Base

class Discount(Base):
    __tablename__ = "discounts"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False)
    value = Column(Float, nullable=False)        # discount amount
    is_active = Column(Boolean, default=True)
    max_uses = Column(Integer, default=1)
    uses = Column(Integer, default=0)
    expires_at = Column(DateTime, nullable=True)
