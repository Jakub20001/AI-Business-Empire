from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, services, schemas
from ..database import get_db
from ..auth import get_current_user # type: ignore

router = APIRouter(
    prefix='/users',
    tags=['users']
)


@router.get("/")
def get_users():
    return [{"id": 1, "name": "Jakub"}]

@router.get("/me/progress", response_model=schemas.ProgressOut)
def read_my_progress(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    progress = services.get_or_create_progress(db, current_user.id)
    return {"xp": progress.xp, "level": progress.level}

@router.post("/me/add-xp", response_model=schemas.ProgressOut)
def add_xp_to_user(xp: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if xp <= 0:
        raise HTTPException(status_code=400, detail="XP must be positive.")
    progress = services.add_xp(db, current_user.id, xp)
    return {"xp": progress.xp, "level": progress.level}
   
@router.get("/progress/", response_model = schemas.ProgressOut)
def get_progress(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return services.get_user_progress(db, current_user)

