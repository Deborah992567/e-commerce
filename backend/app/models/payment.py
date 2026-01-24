from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from app.core.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending")
    paid_at = Column(DateTime, nullable=True)

    order = relationship("Order")
