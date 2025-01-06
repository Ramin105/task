function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

async function fetchUsers(query) {
  if (!query) {
    clearOffered();
    return;
  }
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?name_like=${query}`
  );
  const users = await response.json();
  displayOffered(users);
}

function displayOffered(users) {
  const offeredContainer = document.querySelector(".offered");
  clearOffered();

  if (users.length === 0) {
    offeredContainer.innerHTML = "<div>No users found</div>";
    return;
  }

  users.forEach((user) => {
    const offered = document.createElement("div");
    offered.textContent = user.name;
    offered.addEventListener("click", () => fillForm(user));
    offeredContainer.appendChild(offered);
  });
}

function fillForm(user) {
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("website").value = user.website;
  clearOffered();
  document.getElementById("user-search").value = user.name;
}

function clearOffered() {
  const offeredContainer = document.querySelector(".offered");
  offeredContainer.innerHTML = "";
}

const userInput = document.getElementById("user-search");
const debouncedFetchUsers = debounce(fetchUsers, 300);

userInput.addEventListener("input", (event) => {
  const query = event.target.value;
  debouncedFetchUsers(query);
});
