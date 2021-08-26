"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const text = document.getElementById('demonName');
const button = document.getElementById('startBtn');
const timer = document.getElementById('timer');
const demons = document.getElementById('demonsCompleted');
const menu = document.getElementById('pauseMenu');
const load = document.getElementById('loadFile');
let started = false;
let demonsCompleted = 0;
let startHours = 2;
let time = startHours * 60 * 60;
let pauseOppened = false;
function getRandomLevel() {
    return __awaiter(this, void 0, void 0, function* () {
        if (started == false) {
            button.innerText = 'Completed';
            started = true;
            startHours = 2;
            time = startHours * 60 * 60;
            demonsCompleted = 0;
            demons.innerText = 'Demons Completed: 0';
        }
        else {
            demonsCompleted++;
            demons.innerText = 'Demons Completed: ' + demonsCompleted;
        }
        const randomPage = Math.floor(Math.random() * (92 - 1) + 1);
        const randomResult = Math.floor(Math.random() * (10 - 1) + 1);
        let res = null;
        try {
            res = yield (yield (yield (fetch(`https://gdbrowser.com/api/search/*?diff=-2&demonFilter=1&page=${randomPage}`)))).json();
        }
        catch (_a) {
            text.innerText = 'Servers Down';
        }
        const level = res[randomResult];
        console.log(level.name);
        text.innerText = level.name + '\nBy ' + level.author + '\n' + level.id;
    });
}
function giveUp() {
    started = false;
    button.innerText = 'Start';
    text.innerText = `You Completed ${demonsCompleted} Demons`;
    timer.innerText = 'YOU GAVE UP';
}
function updateTimer() {
    if (time == 0) {
        timer.innerText = 'TIME\'S UP!';
        return;
    }
    if (!started == true)
        return;
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timer.innerText = `${hours}:${minutes}:${seconds}`;
    time--;
}
setInterval(updateTimer, 1000);
function saveData() {
    // I have no idea how to make this
    const dataToSave = {
        timeRemaining: time,
        demonsCompleted: demonsCompleted,
    };
    const savedData = JSON.stringify(dataToSave);
    console.log(savedData);
    const dataFile = new Blob([savedData], { type: 'text/json' });
    var fileURL = window.URL.createObjectURL(dataFile);
    var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', 'Easy-Demon-Challenge.edc');
    document.body.appendChild(fileLink);
    fileLink.click();
}
function loadData() {
}
function pause() {
    if (pauseOppened == false && started == true) {
        menu.style.visibility = 'visible';
        started = false;
        pauseOppened = true;
    }
    else if (pauseOppened == true) {
        menu.style.visibility = 'hidden';
        started = true;
        pauseOppened = false;
    }
    else {
        window.alert('You can\'t pause if game didn\'t start lmao.');
    }
}
