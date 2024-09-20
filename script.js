const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const timer = document.getElementById('timer');
const videoContainer = document.getElementById('videoContainer');
const overlay = document.getElementById('videoOverlay');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let hideTimeout;

function togglePlayPause() {
  if (video.paused) {
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    overlay.style.opacity = 0;
    overlay.style.visibility = 'hidden';
  } else {
    video.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    overlay.style.opacity = 1;
    overlay.style.visibility = 'visible';
  }
  resetHideTimeout();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

videoContainer.addEventListener('click', (e) => {
  if (e.target !== playPauseBtn && e.target !== fullscreenBtn) {
    togglePlayPause();
  }
});

playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  togglePlayPause();
});

fullscreenBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleFullscreen();
});

function updateTimer() {
  const remainingTime = Math.floor(video.duration - video.currentTime);
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  let timerText;
  if (hours > 0) {
    timerText = `0${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds} H`;
  } else if (minutes > 0) {
    timerText = `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds} M`;
  } else {
    timerText = `00:${seconds < 10 ? '0' : ''}${seconds} S`;
  }

  timer.textContent = timerText;
}

video.addEventListener('loadedmetadata', () => {
  updateTimer();
});

video.addEventListener('timeupdate', () => {
  updateTimer();

  if (video.ended) {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    overlay.style.opacity = 1;
    overlay.style.visibility = 'visible';
    updateTimer();
  }
});

videoContainer.addEventListener('mousemove', () => {
  playPauseBtn.classList.remove('hidden');
  resetHideTimeout();
});

function hideButton() {
  if (!video.paused) {
    playPauseBtn.classList.add('hidden');
  }
}

function resetHideTimeout() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(hideButton, 3000);
  s;
}

playPauseBtn.classList.remove('hidden');
