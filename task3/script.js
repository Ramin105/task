const todoInput = document.querySelector(".todoInput");
const addButton = document.querySelector(".addButton");
const todoList = document.querySelector(".todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => toggleComplete(index));
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener("click", () => deleteTodo(index));

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

addButton.addEventListener("click", addTodo);

renderTodos();
