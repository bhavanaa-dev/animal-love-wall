const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addMemory);

loadMemories();

function addMemory() {
  const animal = document.getElementById("animal").value.trim();
  const name = document.getElementById("name").value.trim();
  const place = document.getElementById("place").value.trim();
  const feeling = document.getElementById("feeling").value.trim();

  if (!animal || !place || !feeling) {
    alert("Please fill required fields 🐾");
    return;
  }

  const currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));

  const user = users.find(u => u.username === currentUser);

  user.memories.push({ animal, name, place, feeling });

  localStorage.setItem("users", JSON.stringify(users));

  clearInputs();
  renderWall();
}

function loadMemories() {
  renderWall();
}

function renderWall() {
  const wall = document.getElementById("wall");
  wall.innerHTML = "";

  const currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(u => u.username === currentUser);

  user.memories.forEach((memory, index) => {
    const div = document.createElement("div");
    div.className = "memory";

    div.innerHTML = `
      <div class="memory-header">
        <p>🐾 <strong>${memory.animal}</strong></p>
        <button class="delete-btn" onclick="deleteMemory(${index})">❌</button>
      </div>
      <p>Name: ${memory.name || "—"}</p>
      <p>Place: ${memory.place}</p>
      <p>Feeling: ${memory.feeling}</p>
    `;

    wall.appendChild(div);
  });
}

function deleteMemory(index) {
  const currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(u => u.username === currentUser);

  user.memories.splice(index, 1); // remove memory

  localStorage.setItem("users", JSON.stringify(users));
  renderWall();
}

function clearInputs() {
  document.getElementById("animal").value = "";
  document.getElementById("name").value = "";
  document.getElementById("place").value = "";
  document.getElementById("feeling").value = "";
}
