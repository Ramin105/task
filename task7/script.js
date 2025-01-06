const loadingMessage = document.querySelector(".loading-message");
const errorMessage = document.querySelector(".error-message");
const apiData = document.querySelector(".api-data");
loadingMessage.style.display = "block";

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    loadingMessage.style.display = "none";

    apiData.innerHTML = `
             <h2>Received Data:</h2>
             <pre>${JSON.stringify(data.slice(0, data.length), null, 2)}</pre>
         `;
  })
  .catch((error) => {
    loadingMessage.style.display = "none";

    errorMessage.style.display = "block";
    console.log("Xəta:", error);
  });
