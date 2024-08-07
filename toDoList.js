document.getElementById("taskAddButton").addEventListener("click", () => {
  addName();
  addTask();
  addPost();
});
let list = [];

function addName() {
  const inputName = document.getElementById("inputName");
  const name = inputName.value.trim();

  if (name) {
    list.push(name);
    inputName.value = "";
    updateTaskList();
    saveArray();
  }
}

function addTask() {
  const inputToDoList = document.getElementById("inputToDoList");
  const toDoList = inputToDoList.value.trim();

  if (toDoList) {
    list.push(toDoList);
    inputToDoList.value = "";
    updateTaskList();
    saveArray();
  }
}

function addPost() {
  const inputPost = document.getElementById("inputPost");
  const post = inputPost.value.trim();

  if (post) {
    list.push(post);
    inputPost.value = "";
    updateTaskList();
    saveArray();
  }
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  list.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task;

    const removeButton = document.createElement("button");
    removeButton.id = "removeButton";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeTask(index));

    const editButton = document.createElement("button");
    editButton.id = "editButton";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(index));

    taskItem.appendChild(removeButton);
    taskItem.appendChild(editButton);
    taskList.appendChild(taskItem);
  });
}

function removeTask(index) {
  list.splice(index, 1);
  updateTaskList();
  saveArray();
}

function editTask(index) {
  const newTask = prompt("Edit task:", list[index]);

  if (newTask !== null && newTask.trim() !== "") {
    list.splice(index, 1, newTask.trim());
    updateTaskList();
    saveArray();
  }
}

function clearTasks() {
  list = [];
  updateTaskList();
  saveArray();
}

function saveArray() {
  localStorage.setItem("tasks", JSON.stringify(list));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  list = savedTasks;
  updateTaskList();
});
