from pydantic import BaseModel
from typing import Optional, List 

class UserBase(BaseModel):
    username: str
    
class UserCreate(UserBase):
    password: str
    
class UserOut(UserBase):
    id: int
    class Config:
         from_attributes = True
         
class Token(BaseModel):
    access_token: str
    token_type: str
    
class AnnouncementBase(BaseModel):
    title: str
    description: str
    
class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementOut(AnnouncementBase):
    id: int
    owner_id: int
    class Config:
        orm_mode = True