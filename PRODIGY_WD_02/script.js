let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];
let timerInterval;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');
const toggleModeBtn = document.getElementById('toggleMode');

// Sound Effects
const startSound = new Audio('start-sound.mp3');
const lapSound = new Audio('lap-sound.mp3');

// Toggle Stopwatch Modes (Dark/Light)
function toggleMode() {
    document.body.classList.toggle('light-mode');
}

// Start/Pause Stopwatch
function toggleStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startSound.play();  // Play start sound
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        startSound.play();  // Play start sound
    }
    isRunning = !isRunning;
}

// Update Stopwatch Time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    display.textContent = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

// Format Time with Leading Zeros
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// Reset Stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapTimes = [];
    lapList.innerHTML = '';
}

// Record Lap
function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapSound.play();  // Play lap sound
    }
}

// Event Listeners
startStopBtn.addEventListener('click', toggleStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
toggleModeBtn.addEventListener('click', toggleMode);
