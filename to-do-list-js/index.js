const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Load the existing todos from localStorage 
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to render the todos on the webpage
function renderTodos() {
  // Clear the existing list
  todoList.innerHTML = "";

  // Loop through the todos and add them to the list
  for (let i = todos.length - 1; i >= 0; i--) {
    const todo = todos[i];

    const li = document.createElement("li");
    li.innerText = todo;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      removeTodo(i);
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () => {
      editTodo(i);
    });

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    todoList.appendChild(li);
  }
}

// Function to add a new todo
function addTodo() {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    return;
  }

  todos.unshift(newTodo); // Add the new todo to the beginning of the array
  localStorage.setItem("todos", JSON.stringify(todos)); 
  todoInput.value = ""; 
  renderTodos(); // Re-render the todo list on the webpage
}

// Function to remove a todo
function removeTodo(index) {
  todos.splice(index, 1); // Remove the todo from the array
  localStorage.setItem("todos", JSON.stringify(todos)); // Save the updated array to localStorage
  renderTodos(); // Re-render the todo list on the webpage
}

// Function to edit a todo
function editTodo(index) {
  const newTodo = prompt("Edit the todo:", todos[index]); // Show a prompt to edit the todo
  if (newTodo === null) { // If the user cancels the prompt
    return;
  }

  todos[index] = newTodo.trim(); // Update the todo in the array
  localStorage.setItem("todos", JSON.stringify(todos)); // Save the updated array to localStorage
  renderTodos(); 
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
  addTodo();
});

renderTodos(); 
