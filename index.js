const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let millis = 0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true
    clearInterval(intervalId)

    startTime = 0;
    elapsedTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    millis = 0;
    
    timeDisplay.textContent = "00:00:00:000"
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    console.log(elapsedTime)

    millis = Math.floor(elapsedTime % 1000);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor(elapsedTime / (1000 * 60 * 60));

    secs = format(secs);
    mins = format(mins);
    hrs = format(hrs);
    millis = formatmils(millis);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${millis}`

    function format(unit){
        return ("0" + unit).length > 2 ? unit : "0" + unit;
    }

    function formatmils(unit){
        if (unit >= 100){
            return unit;
        } else if(unit >= 10){
            return "0" + unit;
        } else {
            return "00" + unit
        }
    }
}
