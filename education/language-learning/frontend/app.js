fetch("http://localhost:8000/lessons")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("lessons");
    container.innerHTML = data.map(lesson => `
        <div>
            <h3>${lesson.title}</h3>
            <p>${lesson.content}</p>
            <small>Level: ${lesson.level}</small>
        </div>
    `).join("");
  })

  async function fetchUserProgress() {
    try {
      const response = await fetch("http://localhost:8000/users/me/progress", {
        headers: {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      });
      const data = await response.json();
      document.getElementById("xp").textContent = data.xp;
      document.getElementById("level").textContent = data.level;
    } catch (err) {
        console.error("Failed to fetch progress:", err);
    }
}

fetchUserProgress();