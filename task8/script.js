function fetchPosts() {
  const userId = document.querySelector(".userIdInput").value;

  if (userId === "" || isNaN(userId) || userId < 1) {
    alert("Please enter a valid user ID");
    return;
  }

  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  fetch(url)
    .then((response) => response.json())
    .then((posts) => {
      displayPosts(posts);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function displayPosts(posts) {
  const postsContainer = document.querySelector(".posts");
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts found for this user.</p>";
  } else {
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
                  <h3>${post.title}</h3>
                  <p>${post.body}</p>
              `;
      postsContainer.appendChild(postElement);
    });
  }
}
