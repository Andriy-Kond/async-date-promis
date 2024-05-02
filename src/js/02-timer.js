import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

// console.log("startBtn:::", refs.startBtn);
let selectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    selectedDate = selectedDates[0];
    remainingTime = selectedDate - Date.now();

    if (remainingTime <= 0) {
      window.alert("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }
  },
};

flatpickr("#dateTimePicker", options); // робить вибирач дати у полі інпут (вимагається по документації) з таким селектором

refs.startBtn.addEventListener("click", startTimer);
refs.stopBtn.addEventListener("click", stopTimer);

function startTimer() {
  intervalId = setInterval(() => {
    remainingTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function convertMs(ms) {
  // ms - різниця між кінцевою і поточною датою в мілісекундах.
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
