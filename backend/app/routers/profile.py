from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.models.profile import Profile
from app.schemas.user import ProfileUpdate

router = APIRouter()

@router.get("/")
def get_profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return {
        "full_name": profile.full_name if profile else None,
        "phone": profile.phone if profile else None,
        "email": user.email,
    }

@router.put("/")
def update_profile(
    data: ProfileUpdate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not profile:
        profile = Profile(user_id=user.id)
        db.add(profile)
        db.flush()

    if data.full_name is not None:
        profile.full_name = data.full_name
    if data.phone is not None:
        profile.phone = data.phone

    db.commit()
    return {"full_name": profile.full_name, "phone": profile.phone}
