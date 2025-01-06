const postList = document.getElementById("postList");
const updateMessage = document.getElementById("updateMessage");
let cachedPosts = [];

async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Error:" + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

function renderPosts(posts) {
  postList.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    li.id = `post-${post.id}`;
    li.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
    postList.appendChild(li);
  });
}

function updateChangedPosts(newPosts) {
  let hasUpdates = false;

  newPosts.forEach((newPost) => {
    const cachedPost = cachedPosts.find((post) => post.id === newPost.id);
    if (
      !cachedPost ||
      cachedPost.title !== newPost.title ||
      cachedPost.body !== newPost.body
    ) {
      hasUpdates = true;
      const li = document.getElementById(`post-${newPost.id}`);

      if (li) {
        li.innerHTML = `<strong>${newPost.title}</strong><br>${newPost.body}`;
      } else {
        const newLi = document.createElement("li");
        newLi.id = `post-${newPost.id}`;
        newLi.innerHTML = `<strong>${newPost.title}</strong><br>${newPost.body}`;
        postList.appendChild(newLi);
      }
    }
  });

  cachedPosts = newPosts;

  if (hasUpdates) {
    showUpdateMessage();
  }
}

function showUpdateMessage() {
  updateMessage.style.display = "block";
  setTimeout(() => {
    updateMessage.style.display = "none";
  }, 3000);
}

async function autoRefresh() {
  const newPosts = await fetchPosts();
  if (cachedPosts.length === 0) {
    renderPosts(newPosts);
    cachedPosts = newPosts;
  } else {
    updateChangedPosts(newPosts);
  }
}

autoRefresh();
setInterval(autoRefresh, 30000);
