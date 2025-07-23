from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import services, database, models
from db import get_db # type: ignore
from models import User
from schemas import LeaderboardUser

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

@router.get("/")
def get_leaderboard(db: Session = Depends(database.get_db)):
    users = services.get_leaderboard(db)
    return [
        {
            "username": user.username,
            "total_xp": user.total_xp,
            "level": user.level
        }
        for user in users
    ]
