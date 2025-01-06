fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((users) => {
    console.log("User List");
    users.forEach((user) => console.log(user.name));

    const userList = document.querySelector(".userList");

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      userList.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
