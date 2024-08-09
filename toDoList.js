document.getElementById("taskAddButton").addEventListener("click", addTask);

let list = [{}];
const inputName = document.getElementById("inputName").value.trim();
const toDoList = document.getElementById("inputToDoList").value.trim();
const post = document.getElementById("inputPost").value.trim();
const time = document.getElementById("inputTime").value.trim();
function addTask() {
  const inputName = document.getElementById("inputName").value.trim();
  const toDoList = document.getElementById("inputToDoList").value.trim();
  const post = document.getElementById("inputPost").value.trim();
  const time = document.getElementById("inputTime").value.trim();

  if (inputName && toDoList && post && time) {
    const taskId = `${Date.now()}`;
    list.push({ taskId, inputName, toDoList, post, time });
    clearInputs();
    updateTaskList();
    saveTasks();
  }
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  list.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.taskId}</td>
      <td>${task.inputName}</td>
      <td>${task.toDoList}</td>
      <td>${task.post}</td>
      <td>${task.time}</td>
      <td>
        <button id="removeButton" onClick="removeTask(${index})">Remove</button>
        <button id="editButton" onClick="editTask(${task})">Edit</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function editTask(task) {
  console.log("hello world");
  alert("hello");
  inputName.innerText = task.inputName;
}

function removeTask(index) {
  list.splice(index, 1);
  updateTaskList();
  saveTasks();
}

// Commented out editTask function as it is no longer needed
// function editTask(index, ID, value) {
//   list[index][ID] = value.trim();
//   updateTaskList();
//   saveTasks();
// }

function clearInputs() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputToDoList").value = "";
  document.getElementById("inputPost").value = "";
  document.getElementById("inputTime").value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(list));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  list = savedTasks;
  updateTaskList();
}

document.addEventListener("DOMContentLoaded", loadTasks);
