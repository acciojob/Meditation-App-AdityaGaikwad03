// Select elements
const app = document.querySelector(".app");
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeSelectButtons = document.querySelectorAll(".time-select button");

// Default time (10 mins)
let fakeDuration = 600000; // 10:00 in ms
let timerInterval = null;

// Format time into M:S
const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds}`;
};

// Update displayed time
const updateDisplay = () => {
  const currentTime = song.currentTime * 1000;
  const remaining = fakeDuration - currentTime;
  if (remaining <= 0) {
    clearInterval(timerInterval);
    song.pause();
    song.currentTime = 0;
    play.textContent = "▶";
    timeDisplay.textContent = formatTime(fakeDuration);
  } else {
    timeDisplay.textContent = formatTime(remaining);
  }
};

// Play/Pause logic
play.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    play.textContent = "⏸";
    timerInterval = setInterval(updateDisplay, 1000);
  } else {
    song.pause();
    play.textContent = "▶";
    clearInterval(timerInterval);
  }
});

// Handle duration change
timeSelectButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    fakeDuration = parseInt(this.getAttribute("data-time"));
    timeDisplay.textContent = formatTime(fakeDuration);
    song.pause();
    play.textContent = "▶";
    song.currentTime = 0;
    clearInterval(timerInterval);
  });
});

// Initialize default UI for Cypress test
window.addEventListener("DOMContentLoaded", () => {
  timeDisplay.textContent = formatTime(fakeDuration);
});
