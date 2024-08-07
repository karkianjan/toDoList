document.getElementById("taskAddButton").addEventListener("click", addTask);

let list = [];

function addTask() {
  const inputToDoList = document.getElementById("inputToDoList");
  const toDoList = inputToDoList.value.trim();

  if (toDoList) {
    list.push(toDoList);
    inputToDoList.value = "";
    updateTaskList();
  }
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
}
