from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt

from app.core.config import settings
from app.dependencies.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    hashed = pwd_context.hash(data.password)
    user = User(email=data.email, password=hashed)
    db.add(user)
    db.commit()
    return {"message": "User created"}

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode(
        {"sub": user.id},
        settings.JWT_SECRET,
        algorithm="HS256"
    )
    return {"access_token": token, "token_type": "bearer"}
