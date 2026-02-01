const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(
    task => filter === "all" || task.category === filter
  );

  emptyMsg.style.display = filteredTasks.length ? "none" : "block";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `priority-${task.priority}` + (task.done ? " completed" : "");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">
        ${task.text} <br>
        <small>📂 ${task.category} | 📅 ${task.date}</small>
      </span>
      <div class="actions">
        <span onclick="editTask(${index})">✏️</span>
        <span onclick="deleteTask(${index})">🗑️</span>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text: text,
    category: category.value,
    priority: priority.value,
    date: taskDate.value || "No date",
    done: false
  });

  taskInput.value = "";
  taskDate.value = "";
  save();
  render();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  save();
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  render();
}

function editTask(index) {
  const newText = prompt("Edit your task ✨", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    save();
    render();
  }
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    filter = tab.dataset.filter;
    render();
  });
});

render();
