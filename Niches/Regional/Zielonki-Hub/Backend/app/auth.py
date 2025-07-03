# Moduł uwierzytelniania: rejestracja, logowanie i generowanie tokenów JWT

from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt # type: ignore
from passlib.context import CryptContext # type: ignore
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, database, models

# Sekret JWT (zmień na bezpieczny!)
SECRET_KEY = "tajnykluczJWT"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
# Ustawienia haseł
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# OAuth2 dependency
oauth2_scheme  = OAuth2PasswordBearer(tokenUrl="token")

# Sprawdzenie hasła
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)
# Hashowanie hasła
def get_password_hash(password):
    return pwd_context.hash(password)
# Generowanie tokenu JWT
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithms=[ALGORITHM])
# Funkcja do pobierania aktualnego użytkownika z tokenu
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.SessionLocal)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Nieprawidłowy token logowania",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError as e:
        raise credentials_exception from e
    
    user = crud.get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    return user
    
    
