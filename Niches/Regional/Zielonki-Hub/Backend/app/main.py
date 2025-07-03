# Główna aplikacja FastAPI dla Zielonki Hub, definiująca punkty końcowe (Endpointy)
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import models, schemas, database, crud, auth

models.Base.metadata.create_all(bind=database.engine)

# Tworzenie instancji aplikacji
app = FastAPI()

# Middlewars CORS - pozwala na połączenia z frontendem (React na innym porcie)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoint: Rejestracja użytkownika
@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(database.SessionLocal)):
    # sourcery skip: use-named-expression
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Użytkownik już istnieje")
    return crud.create_user(db, user)
# Endpoint: Logowanie użytkownika
@app.post("/token", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.SessionLocal)):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Błędny login lub hasło")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
# Endpoint: wczytywanie ogłoszeń
@app.get("/announcements", response_model=list[schemas.AnnouncementOut])
def read_announcements(db: Session = Depends(database.SessionLocal)):
    return crud.get_announcements(db)
# Endpoint: Tworzenie nowych ogłoszeń
@app.post("/announcements", response_model=schemas.AnnouncementOut)
def create_announcement(
    announcement: schemas.AnnouncementCreate,
    db: Session = Depends(database.SessionLocal),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_announcement(db, announcement, user_id=current_user.id)
# Endpoint: Źródło główne
# Ten endpoint jest używany do sprawdzenia, czy serwer działa
@app.get("/")
def root():
    return {"message": "Witaj w Zielonki Hub!"}
