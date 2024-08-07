document.getElementById("taskAddButton").addEventListener("click", addTask);

let list = [];

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

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
  });
}

function removeTask(index) {
  list.splice(index, 1);
  updateTaskList();
  saveArray();
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
