const button = document.getElementById('startBtn')
const timer = document.getElementById('timer')
const demons = document.getElementById('demonsCompleted')
const menu = document.getElementById('pauseMenu')
const load = document.getElementById('loadFile')
const demonsName = document.getElementById('demonName')
const demonsDescription = document.getElementById('demonDescription')
const demonsContainer = document.getElementById('demonsContainer')
const allDemons = document.getElementById('allDemons')
const aboutE = document.getElementById('about')

let started = false
let demonsCompleted = 0

let startHours = 2
let time = startHours * 60 * 60
let pauseOppened = false

let demonsArray: any = []

let defaultSeed = '0'

function generateSeed() {
    let seed = ''

    if(defaultSeed == '0') {
        let startNumber = Math.floor(Math.random() * (10 - 0) + 0)

        for(let i = 9; i >= 0; i--) {
            let nextNum = startNumber * 2 + Math.floor(Math.random() * (3 - 0) + 0)
            if(nextNum >= 10) nextNum = Math.floor(nextNum / 3)
            startNumber = nextNum
            seed = seed + nextNum.toString()
        }
        return seed
    } else {
        if(isNaN(parseInt(defaultSeed))) { throw new Error('\x1b[31mError: \x1b[0mThe seed provided must be a number.') }
        if(defaultSeed.length != 10) {
            throw new Error('\x1b[31mError: \x1b[0mThe seed provided must be 10 characters long.')
        } else {
            seed = defaultSeed
            return seed
        }
    }
}

let newSeed = generateSeed()
let initSeedNumber = 0

async function getRandomLevel() {

    if(started == false) { button!.innerText = 'Completed'; startHours = 2; started = true; time = startHours * 60 * 60; demonsCompleted = 0; demons!.innerText = 'Demons Completed: 0'; allDemons!.innerHTML = '' }
    else { demonsCompleted ++; demons!.innerText = 'Demons Completed: ' + demonsCompleted }
    console.log(newSeed)
    const randomPage = parseInt(newSeed[initSeedNumber])**2 + parseInt(newSeed[initSeedNumber ** 2 / 10])
    const randomResult = Math.floor(Math.random() * (10 - 1) + 1)
    let res = null

    try { res = await (await(await (fetch(`https://gdbrowser.com/api/search/*?diff=-2&demonFilter=1&page=${randomPage}`)))).json() }
    catch { window.alert('Reached Rate Limit, try again in a few seconds.') }

    const level = res[randomResult]

    const newTabId = demonsCompleted -1

    allDemons!.innerHTML = allDemons!.innerHTML.toString() + `\n<div class="demonTabsBorder", id="demonTab${newTabId.toString()}"><div class="demonTabsInside"><div class="face"></div><div class="demonsTextContainer"><div class="demonName">#${demonsCompleted + 1} - ${level.name}</div><div class="demonDescription", id="demonDescription${newTabId.toString()}">a</div></div></div></div>`
    
    const newTab = document.getElementById(`demonTab${newTabId.toString()}`)
    const newDes = document.getElementById(`demonDescription${newTabId.toString()}`)

    newDes!.innerText = `By: ${level.author}\nID: ${level.id}`

    demonsArray.push(level)

    allDemons!.scrollTop = allDemons!.scrollHeight - allDemons!.clientHeight;
    newTab!.style.marginLeft = '0rem'

    initSeedNumber ++
}

function giveUp() {
    if(started == false) { window.alert('Hey! You can\'t give up if you didn\'t start.'); return }
    if(confirm('Are you sure you want to give up? The challenge will end.')) {
        started = false
        button!.innerText = 'Start'
        timer!.innerText = 'You Gave Up'
    } else {
        return
    }
}

function updateTimer() {
    if(time == 0) { timer!.innerText = 'Time\'s Up!'; return }
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

function about() {
    if(pauseOppened == false) {
        aboutE!.style.visibility = 'visible'
        pauseOppened = true
    } else {
        aboutE!.style.visibility = 'hidden'
        pauseOppened = false
    }
}