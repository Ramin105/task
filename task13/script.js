const API_URL = "https://jsonplaceholder.typicode.com/todos";

async function loadTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
    <button class="check-btn" data-id="${todo.id}">\u2713</button>
            <span class="${todo.completed ? "completed" : ""}" data-id="${
      todo.id
    }">
                ${todo.title}
            </span>
            
            <button class="delete-btn" data-id="${todo.id}">Sil</button>
        `;
    todoList.appendChild(li);
  });

  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll(".check-btn").forEach((btn) => {
    btn.addEventListener("click", toggleComplete);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });
}

async function toggleComplete(event) {
  const todoId = event.target.getAttribute("data-id");
  const todoItem = event.target.nextElementSibling;

  const response = await fetch(`${API_URL}/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: !todoItem.classList.contains("completed"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updatedTodo = await response.json();

  if (updatedTodo.completed) {
    todoItem.classList.add("completed");
  } else {
    todoItem.classList.remove("completed");
  }
}

async function deleteTodo(event) {
  const todoId = event.target.getAttribute("data-id");
  await fetch(`${API_URL}/${todoId}`, {
    method: "DELETE",
  });
  loadTodos();
}

document
  .getElementById("todo-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const todoInput = document.getElementById("todo-input");
    const newTodoTitle = todoInput.value;

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        title: newTodoTitle,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    todoInput.value = "";
    loadTodos();
  });

loadTodos();
