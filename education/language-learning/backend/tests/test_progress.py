from fastapi.testclient import TestClient
from main import app
from backend.database import get_db
from sqlalchemy.orm import Session

client = TestClient(app)

def test_get_progress_authenticated_user():
    token = "Bearer FAKE_TOKEN"
    
    response = client.get(
        "/users/me/progress",
        headers={"Authorization": token}
    )
    assert response.status_code == 200
    data = response.json()
    assert "xp" in data
    assert "level" in data
    
def test_add_xp():
    token = "Bearer FAKE_TOKEN"
    response = client.post(
        "/users/me/add-xp?xp=120",
        headers={"Authorization": token}
    )
    assert response.status_code == 200
    assert response.json()["level"] >= 2