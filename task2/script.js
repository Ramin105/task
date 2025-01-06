const timeCounter = document.querySelector(".timeCounter");
const startButton = document.querySelector(".startButton");
const stopButton = document.querySelector(".stopButton");
const resetButton = document.querySelector(".resetButton");

let timer = null;
let second = 0;
let minute = 0;
let hours = 0;
function updateDisplay() {
  timeCounter.textContent = `${hours}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

startButton.addEventListener("click", () => {
  if (timer === null) {
    resetButton.style.display = "none";
    timer = setInterval(() => {
      second++;

      if (second === 60) {
        second = 0;
        minute++;
      }
      if (minute === 60) {
        minute = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
  }
});

stopButton.addEventListener("click", () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
    resetButton.style.display = "inline";
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  second = 0;
  minute = 0;
  hours = 0;
  updateDisplay();
});
