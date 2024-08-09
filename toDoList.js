document.getElementById("taskAddButton").addEventListener("click", addTask);
let list = [];
isEdit = false;

function addTask() {
  const inputName = document.getElementById("inputName").value.trim();
  const toDoList = document.getElementById("inputToDoList").value.trim();
  const post = document.getElementById("inputPost").value.trim();
  const time = document.getElementById("inputTime").value.trim();

  if (inputName && toDoList && post && time) {
    if (isEdit) {
      list[editTask] = {
        ...list[editTask],
        inputName,
        toDoList,
        post,
        time,
      };
      isEdit = false;
      editIndex = null;
      document.getElementById("taskAddButton").textContent = "Add Task";
    } else {
      const taskId = `${Date.now()}`;
      list.push({ taskId, inputName, toDoList, post, time });
    }
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
       <button id="editButton" onClick="editTask(${index})">Edit</button>
       </td>
    `;

    taskList.appendChild(row);
  });
}

function editTask(index) {
  const task = list[index];
  document.getElementById("inputName").value = task.inputName;
  document.getElementById("inputToDoList").value = task.toDoList;
  document.getElementById("inputPost").value = task.post;
  document.getElementById("inputTime").value = task.time;

  list.splice(index, 1);
  updateTaskList();
  saveTasks();
}

function removeTask(index) {
  list.splice(index, 1);
  updateTaskList();
  saveTasks();
}

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
