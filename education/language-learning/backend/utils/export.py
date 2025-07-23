import csv
from fpdf import FPDF # type: ignore
from models import User
from sqlalchemy.orm import Session

def export_leaderboard_csv(db: Session, path="leaderboard.csv"):
    users = db.query(User).order_by(User.xp.desc()).all()
    with open(path, "w", newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Username", "XP", "Level"])
        for user in users:
            writer.writerow([user.username, user.xp, user.level])

def export_leaderboard_pdf(db: Session, path="leaderboard.pdf"):
    users = db.query(User).order_by(User.xp_desc()).all()
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Leaderboard", ln=True, align="C")
    for idx, user in enumerate(users, 1):
        pdf.cell(200, 10, txt=f"{idx}. {user.username} - {user.xp} XP (lvl {user.level})", ln=True)
    pdf.output(path)
