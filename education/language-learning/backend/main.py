from fastapi import FastAPI
from routers import lessons, users, leaderboard, quiz

app = FastAPI(title="AI Language Learning")

app.include_router(lessons.router, prefix="/lessons", tags=["Lessons"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(leaderboard.router)
app.include_router(quiz.router)

@app.get("/")
def root():
    return {"message": "Welcome to the AI Language Learning Platform"}

