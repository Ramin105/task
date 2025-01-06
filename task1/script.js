const box = document.querySelector(".box");
const togglebutton = document.querySelector(".togglebutton");

togglebutton.addEventListener("click", () => {
  if (box.style.backgroundColor === "red" || box.style.backgroundColor == "") {
    box.style.backgroundColor = "green";
    togglebutton.textContent = "Qırmızı et";
    togglebutton.style.color = "red";
  } else {
    box.style.backgroundColor = "red";

    togglebutton.textContent = "Yaşıl et";
    togglebutton.style.color = "green";
  }
});
