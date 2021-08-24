const text = document.getElementById('demonName')
const button = document.getElementById('startBtn')
const timer = document.getElementById('timer')
const demons = document.getElementById('demonsCompleted')

let started = false
let demonsCompleted = 0

let startHours = 2
let time = startHours * 60 * 60

async function getRandomLevel() {

    if(started == false) { button!.innerText = 'Completed'; started = true; startHours = 2; time = startHours * 60 * 60; demonsCompleted = 0; demons!.innerText = 'Demons Completed: 0' }
    else { demonsCompleted ++; demons!.innerText = 'Demons Completed: ' + demonsCompleted }

    const randomPage = Math.floor(Math.random() * (92 - 1) + 1)
    const randomResult = Math.floor(Math.random() * (10 - 1) + 1)
    let res = null

    try { res = await (await(await (fetch(`https://gdbrowser.com/api/search/*?diff=-2&demonFilter=1&page=${randomPage}`)))).json() }
    catch { text!.innerText = 'Servers Down' }

    const level = res[randomResult]
    console.log(level.name)
    text!.innerText = level.name + '\nBy ' + level.author + '\n' + level.id
}

function giveUp() {
    started = false
    button!.innerText = 'Start'
    text!.innerText = `You Completed ${demonsCompleted} Demons`
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