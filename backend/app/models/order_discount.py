from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class OrderDiscount(Base):
    __tablename__ = "order_discounts"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    discount_id = Column(Integer, ForeignKey("discounts.id"), nullable=False)
    amount = Column(Float, nullable=False)

    order = relationship("Order", back_populates="discount")
