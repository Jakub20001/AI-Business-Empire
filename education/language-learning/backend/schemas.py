from pydantic import BaseModel

class LessonCreate(BaseModel):
    title: str
    content: str
    level: str
    
class LessonOut(LessonCreate):
    id: int
    
    class Config:
        orm_mode = True
        
class ProgressBase(BaseModel):
    xp: int
    level: int
    
class ProgressResponse(ProgressBase):
    class Config:
        orm_mode = True
        
class ProgressOut(BaseModel):
    xp: int
    level: int
    
class LeaderboardUser(BaseModel):
    username: str
    xp: int
    level: int
    
    class Config:
        orm_mode = True