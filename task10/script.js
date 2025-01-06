function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

async function fetchUsers(query) {
  if (!query) return;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?name_like=${query}`
  );
  const users = await response.json();
  displayUsers(users);
}

function displayUsers(users) {
  const userList = document.querySelector(".userList");
  userList.innerHTML = "";
  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.textContent = user.name;
    userList.appendChild(userItem);
  });
}

const debouncedFetchUsers = debounce(fetchUsers, 500);

function handleInput(event) {
  const query = event.target.value;
  debouncedFetchUsers(query);
}
