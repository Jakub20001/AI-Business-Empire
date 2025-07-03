# Schematy Pydantic - służą do walidacji danych wejściowych i wyjściowych

from pydantic import BaseModel
from typing import Optional, List 

# Schemat danych do utworzenia bazy dla użytkownika
class UserBase(BaseModel):
    username: str

# Schemat danych do rejestracji użytkownika
class UserCreate(UserBase):
    username: str
    password: str
# Schemat danych do wyjścia użyttkownika  
class UserOut(UserBase):
    id: int
    class Config:
         from_attributes = True
# Schemat danych do logowania użytkownika i tokenów
class Token(BaseModel):
    access_token: str
    token_type: str
# Schemat danych do ogłoszeń
class AnnouncementBase(BaseModel):
    title: str
    description: str
# Schemat danych do tworzenia ogłoszeń
class AnnouncementCreate(AnnouncementBase):
    pass
# Schemat danych do wyjścia ogłoszeń
# Zawiera dodatkowe pola takie jak id i owner id
class AnnouncementOut(AnnouncementBase):
    id: int
    owner_id: int
    class Config:
        orm_mode = True
