fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((posts) => {
    const postsList = document.querySelector(".posts-list");
    const ul = document.createElement("ul");

    posts.slice(0, 5).forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;

      const detailsButton = document.createElement("button");
      detailsButton.textContent = "Details";
      detailsButton.addEventListener("click", () => showDetails(post.id));
      li.appendChild(detailsButton);
      ul.appendChild(li);
    });

    postsList.appendChild(ul);
  })
  .catch((error) => console.log("Xəta baş verdi:", error));

function showDetails(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      const detailsDiv = document.createElement("div");
      detailsDiv.innerHTML = `
                        <h2>Post Details</h2>
                        <p><strong>Title:</strong> ${post.title}</p>
                        <p><strong>Body:</strong> ${post.body}</p>
                    `;

      const existingDetails = document.querySelector(".post-details");
      if (existingDetails) {
        existingDetails.remove();
      }
      detailsDiv.className = "post-details";
      document.body.appendChild(detailsDiv);
    })
    .catch((error) => console.log("Xəta baş verdi:", error));
}
