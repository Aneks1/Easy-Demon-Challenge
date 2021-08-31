const button = document.getElementById('startBtn')
const timer = document.getElementById('timer')
const demons = document.getElementById('demonsCompleted')
const menu = document.getElementById('pauseMenu')
const load = document.getElementById('loadFile')
const demonsName = document.getElementById('demonName')
const demonsDescription = document.getElementById('demonDescription')
const demonsContainer = document.getElementById('demonsContainer')
const allDemons = document.getElementById('allDemons')

let started = false
let demonsCompleted = 0

let startHours = 2
let time = startHours * 60 * 60
let pauseOppened = false

let demonsArray: any = []

async function getRandomLevel() {

    if(started == false) { button!.innerText = 'Completed'; startHours = 2; started = true; time = startHours * 60 * 60; demonsCompleted = 0; demons!.innerText = 'Demons Completed: 0' }
    else { demonsCompleted ++; demons!.innerText = 'Demons Completed: ' + demonsCompleted }

    const randomPage = Math.floor(Math.random() * (92 - 1) + 1)
    const randomResult = Math.floor(Math.random() * (10 - 1) + 1)
    let res = null

    try { res = await (await(await (fetch(`https://gdbrowser.com/api/search/*?diff=-2&demonFilter=1&page=${randomPage}`)))).json() }
    catch { window.alert('Reached Rate Limit, try again in a few seconds.') }

    const level = res[randomResult]

    const newTabId = demonsCompleted -1

    allDemons!.innerHTML = allDemons!.innerHTML.toString() + `\n<div class="demonTabsBorder", id="demonTab${newTabId.toString()}"><div class="demonTabsInside"><div class="face"></div><div class="demonsTextContainer"><div class="demonName">${level.name}</div><div class="demonDescription", id="demonDescription${newTabId.toString()}">a</div></div></div></div>`
    
    const newTab = document.getElementById(`demonTab${newTabId.toString()}`)
    const newDes = document.getElementById(`demonDescription${newTabId.toString()}`)

    newDes!.innerText = `By: ${level.author}\nID: ${level.id}`
    demonsArray.push(level)

    setTimeout(() => { newTab!.style.marginLeft = '0rem' }, 1)
}

function giveUp() {
    started = false
    button!.innerText = 'Start'
    timer!.innerText = 'YOU GAVE UP'
}

function updateTimer() {
    if(time == 0) { timer!.innerText = 'TIME\'S UP!'; return }
    if(!started == true) return
    let hours: any = Math.floor(time / 60 / 60)
    let minutes: any = Math.floor(time / 60) % 60
    let seconds: any = time % 60

    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes

    timer!.innerText = `${hours}:${minutes}:${seconds}`
    time --
}

setInterval(updateTimer, 1000)

function saveData() {
    // I have no idea how to make this
    const dataToSave = {
        timeRemaining: time,
        demonsCompleted: demonsCompleted,
        demonsArray: demonsArray
    }
    const savedData = JSON.stringify(dataToSave)
    console.log(savedData)

    const dataFile = new Blob([savedData], { type: 'text/json'})

    var fileURL = window.URL.createObjectURL(dataFile);
    var fileLink = document.createElement('a');
  
    fileLink.href = fileURL;
    fileLink.setAttribute('download', 'Easy-Demon-Challenge.edc');
    document.body.appendChild(fileLink);
   
    fileLink.click();
}

function loadData() {
    window.alert('Not working yet :(\nI will add it in the next update.')
}

function pause() {
    if(pauseOppened == false && started == true) {
        menu!.style.visibility = 'visible'
        started = false
        pauseOppened = true
    } else if(pauseOppened == true) {
        menu!.style.visibility = 'hidden'
        started = true
        pauseOppened = false
    } else {
        window.alert('You can\'t pause if game didn\'t start lmao.')
    }
}