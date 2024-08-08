document.getElementById("taskAddButton").addEventListener("click", addTask);

let list = [];

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
      <td><input type="text" value="${task.inputName}" onchange="editTask(${index}, 'inputName', this.value)" /></td>
      <td><input type="text" value="${task.toDoList}" onchange="editTask(${index}, 'toDoList', this.value)" /></td>
      <td><input type="text" value="${task.post}" onchange="editTask(${index}, 'post', this.value)" /></td>
      <td><input type="text" value="${task.time}" onchange="editTask(${index}, 'time', this.value)" /></td>
      <td>
        <button id="removeButton" onclick="removeTask(${index})" >Remove</button>
        <button id="editButton" onclick="editTask(${index})" >Edit</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function removeTask(index) {
  list.splice(index, 1);
  updateTaskList();
  saveTasks();
}

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
