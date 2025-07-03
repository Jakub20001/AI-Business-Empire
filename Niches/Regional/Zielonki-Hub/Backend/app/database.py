# Utworzenie bazy danych i sesji SQLAlchemy
# Moduł do zarządzania bazą danych i sesjami SQLAlchemy
# Używamy SQLite jako bazy danych, ale można to zmienić na inną

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./zielonki.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
