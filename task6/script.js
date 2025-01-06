document
  .querySelector(".post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector(".title").value;
    const body = document.querySelector(".body").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const submitDataDiv = document.querySelector(".submit-data");
        submitDataDiv.innerHTML = `
            <h3>Sent Data:</h3>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
           
        `;
      })
      .catch((error) => console.log("Xəta baş verdi:", error));
  });
