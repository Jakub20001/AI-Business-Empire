from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas import LessionCreate, LessonOut
from services import create_lesson, get_lessons

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.post("/", response_model=LessonOut)
def create(lesson: LessionCreate, db: Session = Depends(get_db)):
    return create_lesson(db, lesson)

@router.get("/", response_model=list[LessonOut])
def read_all(db: Session = Depends(get_db)):
    return get_lessons(db)
        