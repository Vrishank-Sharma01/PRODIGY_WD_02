let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function updateDisplay() {
  const now = Date.now();
  const time = isRunning ? now - startTime + elapsedTime : elapsedTime;
  
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  
  document.getElementById('display').innerText =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
  } else {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 1000);
  }
  isRunning = !isRunning;
  document.querySelector('.buttons button').innerText = isRunning ? 'Pause' : 'Start';
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  document.getElementById('display').innerText = '00:00:00';
  document.querySelector('.buttons button').innerText = 'Start';
  document.getElementById('laps').innerHTML = '';
}

function recordLap() {
  if (!isRunning && elapsedTime === 0) return;

  const now = Date.now();
  const time = isRunning ? now - startTime + elapsedTime : elapsedTime;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  
  const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  
  const li = document.createElement('li');
  li.textContent = `Lap: ${lapTime}`;
  document.getElementById('laps').appendChild(li);
}