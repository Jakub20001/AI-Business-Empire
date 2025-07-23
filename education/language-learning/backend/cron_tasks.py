from apsscheduler.schedulers.background import BackgroundScheduler # type: ignore
from datetime import datetime
from sqlalchemy.orm import Session
from db import SessionLocal # type: ignore
from models import User

def reset_weekly_rp():
    db: Session = SessionLocal()
    users = db.query(User).all()
    for user in users:
        user.weekly_xp = 0
    db.commit()
    db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(reset_weekly_rp, 'cron', day_of_week="mon", hour = 0)
scheduler.start()
