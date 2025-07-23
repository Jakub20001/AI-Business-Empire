from requests import Session
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from .database import Base
from sqlalchemy.orm import relationship
from .user import User # type: ignore
from datetime import datetime


class UserProgress(Base):
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    
    user = relationship("User", back_populates="progress")
    
    def calculate_level(self):
        return (self.xp // 100) + 1

class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key = True, index = True)
    title = Column(String)
    content = Column(String)
    level = Column(String)
    
class User(Base):
    __tablename__ = "users";
    progress = relationship("UserProgress", back_populates="user", uselist = False)
    
    id = Column(Integer, primary_key = True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index = True)
    hashed_password = Column(String)
    
    xp = Column(Integer, default=0)
    level = Column(Integer, default = 1)
    xp_logs = relationship("XPLog", back_populates = "user")
    
    def add_xp(self, amount: int):
        self.xp += amount
        while self.xp >= self.xp_to_next_level():
            self.xp -= self.xp_to_next_level()
            self.level += 1

    def xp_to_next_level(self):
        return 100 + (self.level - 1) * 50
    
class XPLog(Base):
    __tablename__ = "xp_logs"
    
    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer, ForeignKey("users.id"))
    activity_type = Column(String, index = True)
    activity_id = Column(Integer, nullable = True)
    xp_gained = Column(Integer)
    timestamp = Column(DateTime, default = datetime.utcnow)
    
    user = relationship("User", back_populates="xp_logs")
    
User.xp_logs = relationship("XPLog", back_populates="user")

class Badge(Base):
    __tablename__ = "badges"
    id = Column(Integer, primary_key = True)
    name = Column(String, unique=True)
    description = Column(String)
    icon_url = Column(String)
    
class UserBadge(Base):
    __tablename__ = "user_badges"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    badge_id = Column(Integer, ForeignKey("badges.id"))
    awarded_at = Column(DateTime, default=datetime.utcnow)
    
def grant_badge_if_needed(user: User, db: Session):
    if user.xp >= 1000:
        badge = db.query(Badge).filter_by(name="1000 XP Warrior").first()
        if badge:
            existing = db.query(UserBadge).filter_by(user_id=user.id, badge_id=badge.id).first()
            if not existing:
                user_badge = UserBadge(user_id=user.id, badge_id=badge.id)
                db.add(user_badge)
                db.commit()