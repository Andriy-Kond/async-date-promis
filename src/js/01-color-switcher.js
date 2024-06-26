// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }

import getRandomHexColor from "./services/getRandomHexColor.js";

const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

btnStart.addEventListener("click", startChangeBgColor);
btnStop.addEventListener("click", stopChangeBgColor);

let intervalCounter = null;

function startChangeBgColor() {
  btnStart.disabled = true;
  intervalCounter = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeBgColor() {
  clearInterval(intervalCounter);
  btnStart.disabled = false;
}
