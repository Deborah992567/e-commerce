from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.core.config import settings
from app.dependencies.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import pwd_context, create_access_token

router = APIRouter()

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

    access_token = create_access_token(data={"sub": str(user.id)}, expires_delta=timedelta(hours=1))
    return {"access_token": access_token, "token_type": "bearer"}
