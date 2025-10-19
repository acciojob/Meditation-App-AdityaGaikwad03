//your JS code here. If required.
const app = document.getElementById('app');
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('#time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600; // default 10 minutes
let isPlaying = false;

// Update duration based on button click
timeButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.id === 'smaller-mins') fakeDuration = 120;
    else if (this.id === 'medium-mins') fakeDuration = 300;
    else if (this.id === 'long-mins') fakeDuration = 600;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0`;
  });
});

// Play / Pause functionality
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    isPlaying = true;
    playBtn.innerHTML = `<rect x="35" y="30" width="10" height="40" fill="white"></rect>
                         <rect x="55" y="30" width="10" height="40" fill="white"></rect>`;
  } else {
    audio.pause();
    video.pause();
    isPlaying = false;
    playBtn.innerHTML = `<polygon points="40,30 70,50 40,70" fill="white" />`;
  }
});

// Switch between sounds and videos
soundButtons.forEach(button => {
  button.addEventListener('click', function() {
    audio.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Update timer
audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let elapsed = fakeDuration - currentTime;
  let minutes = Math.floor(elapsed / 60);
  let seconds = Math.floor(elapsed % 60);

  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    isPlaying = false;
    playBtn.innerHTML = `<polygon points="40,30 70,50 40,70" fill="white" />`;
  }
};
