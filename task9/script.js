let currentPage = 1;
const postsPage = 5;
let totalPosts = 0;

async function fetchPosts(page) {
  try {
    const totalResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const allPosts = await totalResponse.json();
    totalPosts = allPosts.length;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPage}`
    );
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function displayPosts(posts) {
  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        `;
    postsContainer.appendChild(postElement);
  });
}

function updatePaginationButtons(len) {
  document.getElementById("previous").disabled = currentPage === 1;
  const isLastPage = currentPage * postsPage >= totalPosts;
  document.getElementById("next").disabled = isLastPage;
}

async function loadPosts() {
  const posts = await fetchPosts(currentPage);
  displayPosts(posts);
  updatePaginationButtons(posts.length);
}

document.getElementById("next").addEventListener("click", () => {
  currentPage++;
  loadPosts();
});

document.getElementById("previous").addEventListener("click", () => {
  currentPage--;
  loadPosts();
});

loadPosts();
