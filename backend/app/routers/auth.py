from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from jose import jwt, JWTError

from app.core.config import settings
from app.dependencies.database import get_db
from app.models.user import User
from app.models.profile import Profile
from app.schemas.user import UserCreate, UserLogin, ForgotPassword, ResetPassword, RefreshToken, ChangePassword
from app.core.security import pwd_context, create_access_token, create_refresh_token
from app.dependencies.auth import get_current_user, oauth2_scheme

router = APIRouter()

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    try:
        hashed = pwd_context.hash(data.password)
        user = User(email=data.email, password=hashed)
        db.add(user)
        db.flush()
        if data.full_name:
            db.add(Profile(user_id=user.id, full_name=data.full_name))
        db.commit()
        return {"message": "User created", "user_id": user.id}
    except Exception as e:
        db.rollback()
        if "UNIQUE constraint failed" in str(e) or "unique constraint" in str(e).lower():
            raise HTTPException(status_code=400, detail="Email already registered")
        raise HTTPException(status_code=500, detail="Registration failed")

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(user.id)}, expires_delta=timedelta(hours=1))
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "is_admin": user.is_admin,
            "full_name": profile.full_name if profile else None,
            "phone": profile.phone if profile else None,
        },
    }

@router.post("/refresh")
def refresh_token(data: RefreshToken, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid refresh token",
    )
    try:
        payload = jwt.decode(data.refresh_token, settings.JWT_SECRET, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise credentials_exception
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise credentials_exception

    access_token = create_access_token(data={"sub": str(user.id)}, expires_delta=timedelta(hours=1))
    new_refresh = create_refresh_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "refresh_token": new_refresh, "token_type": "bearer"}

@router.post("/forgot-password")
def forgot_password(data: ForgotPassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        # Don't reveal whether a user exists
        return {"message": "If an account exists with that email, a reset link has been sent."}
    # Demo: generate a reset token and (in production) email it.
    reset_token = create_refresh_token(
        data={"sub": str(user.id), "purpose": "password_reset"},
        expires_delta=timedelta(hours=1),
    )
    print(f"Password reset token for {user.email}: {reset_token}")
    return {"message": "If an account exists with that email, a reset link has been sent."}

@router.post("/reset-password")
def reset_password(data: ResetPassword, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired reset token",
    )
    try:
        payload = jwt.decode(data.token, settings.JWT_SECRET, algorithms=["HS256"])
        if payload.get("purpose") != "password_reset":
            raise credentials_exception
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise credentials_exception

    user.password = pwd_context.hash(data.new_password)
    db.commit()
    return {"message": "Password has been reset successfully"}

@router.post("/change-password")
def change_password(
    data: ChangePassword,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not pwd_context.verify(data.old_password, user.password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    user.password = pwd_context.hash(data.new_password)
    db.commit()
    return {"message": "Password changed successfully"}

@router.get("/me")
def get_me(user=Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "is_admin": user.is_admin,
        "full_name": profile.full_name if profile else None,
        "phone": profile.phone if profile else None,
    }
