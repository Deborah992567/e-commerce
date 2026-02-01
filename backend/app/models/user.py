from sqlalchemy import Column, Integer, String , Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="customer", nullable=False)

    profile = relationship("Profile", uselist=False, back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    is_admin = Column(Boolean, default=False)

