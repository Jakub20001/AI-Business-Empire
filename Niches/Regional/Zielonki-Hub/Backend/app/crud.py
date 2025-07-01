from sqlalchemy.orm import Session
from . import models, schemas
from .auth import get_password_hash

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_announcements(db: Session):
    return db.query(models.Announcement).all()

def create_announcement(db: Session, ann: schemas.AnnouncementCreate, user_id: int):
    db_ann = models.Announcement(**ann.dict(), owner_id=user_id)
    db.add(db_ann)
    db.commit()
    db.refresh(db_ann)
    return db_ann




