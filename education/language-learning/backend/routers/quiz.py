from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import services, database

router = APIRouter(prefix="/quiz", tags=['quiz'])

@router.post("/submit/")
def submit_quiz(user_id: int, score: int, db: Session = Depends(database.get_db)):
    xp = calculate_quiz_xp(score)
    services.add_xp(db, user_id=user_id, xp=xp, activity_type="quiz")
    return {"message": f"{xp} XP awarded"}

def calculate_quiz_xp(score: int) -> int:
    return score * 10