from sqlalchemy.orm import Session
from models import Lesson
from schemas import LessonCreate
from . import models
import math

def calculate_level(total_xp: int) -> int:
    # Example level calculation: every 100 XP is a new level
    level = 1
    while total_xp >= 100 * math.sqrt(level):
        level += 1
    return level - 1

def create_lesson(db: Session, lesson: LessonCreate):
    db_lesson = Lesson(**lesson.dict())
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

def get_lessons(db: Session):
    return db.query(Lesson).all()

def get_or_create_progress(db: Session, user_id: int):
    progress = db.query(models.UserProgress).filter(models.UserProgress.user_id == user_id).first()
    if not progress:
        progress = models.UserProgress(user_id=user_id)
        db.add(progress)
        db.commit()
        db.refresh(progress)
    return progress
    
def add_xp(session: Session, db: Session, user_id: int, xp_amount: int, activity_type: str, activity_id: int = None):
    user = session.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise ValueError("User not found")
    
    xp_log = models.XPLog(
        user_id=user_id,
        xp_gained=xp_amount,
        activity_type=activity_type,
        activity_id=activity_id
    )
    session.add(xp_log)
    
    user.total_xp += xp_amount
    user.level = calculate_level(user.total_xp)
    session.commit()
    progress = get_or_create_progress(db, user_id)
    progress.xp += xp_amount 
    new_level = progress.calculate_level()
    
    if new_level > progress.level:
        progress.level = new_level
        
    db.commit()
    db.refresh(progress)
    return progress

def complete_lesson(db: Session, user_id: int, lesson_id: int):
    xp_reward = 50,
    progress = add_xp(db, user_id, xp_reward)
    
    return {"message": "Lesson completed", "xp": progress.xp, "level": progress.level}

def add_experience(user: models.User, xp_amount: int, db: Session):
    user.add_xp(xp_amount)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_progress(user: models.User):
    return {
        "level": user.level,
        "xp": user.xp,
        "xp_to_next_level": user.xp_to_next_level()
    }
    
def get_leaderboard(session: Session, limit: int = 10):
    return session.query(models.User).order_by(models.User.total_xp.desc()).limit(limit).all()