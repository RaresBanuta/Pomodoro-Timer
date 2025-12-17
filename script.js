const timerBox = document.querySelector(".timer-box");
const timerSettings = document.getElementById("timer-settings");
const cyclesSelect = document.getElementById("cycles-select");
const lengthSelect = document.getElementById("length-select");
const startButton = document.getElementById("cycles-set-btn");
const stopButton = document.getElementById("stop-btn");
const timingBox = document.querySelector(".timing-box");
const timer = document.getElementById("timer");
const timerDisplay = document.getElementById("timer-display");
const minutesTimer = document.getElementById("minutes");
const secondsTimer = document.getElementById("seconds");
const currentCycle = document.getElementById("current-cycle");
const totalCycles = document.getElementById("total-cycles");
const endTimer = document.querySelector(".end-timer");
const zurzeitCycles = document.getElementById("total-cycles-zurzeit");
const restartButton = document.getElementById("restart-btn");
const breakTimer = document.querySelector(".break-timer");
const secondsBreak = document.getElementById("break-seconds");

let limit;
let cycles_final;
let length_pause;
let currentCycleCount;
startButton.addEventListener("click", startTimer);
restartButton.addEventListener("click", stopTimer);
stopButton.addEventListener("click", stopTimer);

function startTimer() {
    createTomatoRain();
    if (limit) {
        clearInterval(limit);
        limit = null;
    }
    minutesTimer.textContent = '25';
    secondsTimer.textContent = '00';
    timerBox.classList.remove('active');
    setTimeout(() => {
        timingBox.classList.add('active');
        showTimer();
    }, 200);
}

function showTimer() {
    if (limit) {
        clearInterval(limit);
        limit = null;
    }
    const cycles = parseInt(cyclesSelect.value);
    const length = parseInt(lengthSelect.value);
    length_pause = length;
    totalCycles.textContent = cycles;
    if (!currentCycleCount) {
        currentCycleCount = 1;
    }
    currentCycle.textContent = currentCycleCount;
    let minutes = parseInt(minutesTimer.textContent);
    let seconds = parseInt(secondsTimer.textContent);
    if (minutes == 25) {
        minutes--;
        seconds = 59;
    }

    limit = setInterval(() => {
        if (minutes == 0 && seconds == 0) {
            if (currentCycleCount == totalCycles) {
                cycles_final = currentCycleCount;
                clearInterval(limit);
                endOfTimer();
                return;
            }
            else {
                currentCycleCount++;
                cycles_final = currentCycleCount;
                clearInterval(limit);
                breakOfTimer();
                return;
            }
        }

        minutesTimer.textContent = minutes;
        if (seconds < 10) {
            secondsTimer.textContent = '0' + seconds;
        } else {
            secondsTimer.textContent = seconds;
        }
        seconds--;

        if (seconds < 0) {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds = 0;
            }
        }
    }, 999);
}

function stopTimer() {
    if (limit) {
        clearInterval(limit);
        limit = null;
    }
    timingBox.classList.remove('active');
    endTimer.classList.remove('active');
    setTimeout(() => {
        timerBox.classList.add('active');
    }, 200);
}

function endOfTimer() {
    zurzeitCycles.textContent = cycles_final;
    minutesTimer.textContent = '0';
    secondsTimer.textContent = '00';
    timingBox.classList.remove('active');
    setTimeout(() => {
        endTimer.classList.add('active');
        createTomatoRain(); // Trigger the celebration!
    }, 100);
}

function createTomatoRain() {
    const amount = 90; // Increased density for masking effect
    const activeBox = timingBox.classList.contains('active') ? timingBox : (timerBox.classList.contains('active') ? timerBox : endTimer);

    // Make the div less visible
    activeBox.classList.add('box-masked');

    for (let i = 0; i < amount; i++) {
        setTimeout(() => {
            const tomato = document.createElement('div');
            tomato.innerHTML = '🍅';
            tomato.classList.add('tomato');

            // Random horizontal position across the whole screen
            tomato.style.left = Math.random() * 100 + 'vw';

            // Random size variation
            tomato.style.fontSize = (Math.random() * 2 + 1) + 'rem';

            // Random speed (between 2 and 4 seconds for a fast rain)
            tomato.style.animationDuration = (Math.random() * 2 + 2) + 's';

            // Higher opacity for better masking
            tomato.style.opacity = Math.random() * 0.4 + 0.6;

            document.body.appendChild(tomato);

            // Clean up the tomato after it falls
            setTimeout(() => {
                tomato.remove();
            }, 4000);
        }, i * 30); // Faster staggering
    }

    // Restore visibility after the rain (approx 6 seconds)
    setTimeout(() => {
        activeBox.classList.remove('box-masked');
    }, 6000);
}
function breakOfTimer() {
    timingBox.classList.remove("active");
    breakTimer.classList.add("active");
    let seconds_counter = length_pause * 60;
    secondsBreak.textContent = seconds_counter;
    limit = setInterval(() => {
        if (seconds_counter <= 0) {
            clearInterval(limit);
            limit = null;
            breakTimer.classList.remove("active");
            // Reset display before calling showTimer
            minutesTimer.textContent = '25';
            secondsTimer.textContent = '00';
            timingBox.classList.add('active');
            showTimer();
            return;
        }
        secondsBreak.textContent = seconds_counter;
        seconds_counter--;
    }, 999);
}