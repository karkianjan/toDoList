// document.getElementById("taskAddButton").addEventListener("click", () => {
//   //   addName();
//   addTask();
//   //   addPost();
// });
// let list = [{}];

// function addTask() {
//   const inputToDoList = document.getElementById("inputToDoList");
//   const toDoList = inputToDoList.value.trim();
//   const inputName = document.getElementById("inputName");
//   const isName = inputName.value.trim();

//   const inputPost = document.getElementById("inputPost");
//   const post = inputPost.value.trim();
//   if (toDoList) {
//     list.push({ toDoList, isName, post });
//     inputToDoList.value = "";
//     updateTaskList();
//     saveArray();
//   }
// }
// // function addName() {
// //   if (isName) {
// //     list.push(isName);
// //     inputName.value = "";
// //     updateTaskList();
// //     saveArray();
// //   }
// // }

// // function addPost() {
// //   if (post) {
// //     list.push(post);
// //     inputPost.value = "";
// //     updateTaskList();
// //     saveArray();
// //   }
// // }

// function updateTaskList() {
//   const taskList = document.getElementById("taskList");
//   taskList.innerHTML = "";

//   list.forEach((task, index) => {
//     const taskItem = document.createElement("li");

//     taskItem.textContent = task.isName + task.toDoList + task.post;

//     const removeButton = document.createElement("button");
//     removeButton.id = "removeButton";
//     removeButton.textContent = "Remove";
//     removeButton.addEventListener("click", () => removeTask(index));

//     const editButton = document.createElement("button");
//     editButton.id = "editButton";
//     editButton.textContent = "Edit";
//     editButton.addEventListener("click", () => editTask(index));

//     taskItem.appendChild(removeButton);
//     taskItem.appendChild(editButton);
//     taskList.appendChild(taskItem);
//   });
// }

// function removeTask(index) {
//   list.splice(index, 1);
//   updateTaskList();
//   saveArray();
// }

// function editTask(index) {
//   const newTask = prompt("Edit task:", list[index]);

//   if (newTask !== null && newTask.trim() !== "") {
//     list.splice(index, 1, newTask.trim());
//     updateTaskList();
//     saveArray();
//   }
// }

// function clearTasks() {
//   list = [];
//   updateTaskList();
//   saveArray();
// }

// function saveArray() {
//   localStorage.setItem("tasks", JSON.stringify(list));
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   list = savedTasks;
//   updateTaskList();
// });

document.getElementById("taskAddButton").addEventListener("click", addTask);

let list = [];

function addTask() {
  const inputName = document.getElementById("inputName").value.trim();
  const toDoList = document.getElementById("inputToDoList").value.trim();
  const post = document.getElementById("inputPost").value.trim();

  if (inputName && toDoList && post) {
    list.push({ inputName, toDoList, post });
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
      <td><input type="text" value="${task.inputName}" onchange="editTask(${index}, 'inputName', this.value)" /></td>
      <td><input type="text" value="${task.toDoList}" onchange="editTask(${index}, 'toDoList', this.value)" /></td>
      <td><input type="text" value="${task.post}" onchange="editTask(${index}, 'post', this.value)" /></td>
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

function editTask(index, key, value) {
  list[index][key] = value.trim();
  updateTaskList();
  saveTasks();
}

function clearInputs() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputToDoList").value = "";
  document.getElementById("inputPost").value = "";
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
