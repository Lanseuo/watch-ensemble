import { sendMessage } from './socket.js'
import { formatTime } from './utils.js'
let video = document.getElementById('video')
let controls = document.getElementsByClassName('controls')[0]
let playPauseButton = document.getElementById('play-pause')
let timeSlider = document.getElementById('time-slider')
let currentTimeLabel = document.getElementById('current-time')
let durationLabel = document.getElementById('duration')
let waitingForClientsLabel = document.getElementById('waiting-for-clients')

let waitingForClients = false

export function setVideo(url) {
    video.setAttribute('src', url)
    timeSlider.value = 0
    controls.classList.add('active')
}

playPauseButton.addEventListener('click', () => {
    let isPlaying = playPauseButton.classList.contains('playing')

    if (isPlaying) {
        pause()
        sendMessage('pause')
    } else {
        play()
        sendMessage('play')
    }
})
export function play() {
    playPauseButton.classList.add('playing')
    video.play()
}


export function pause() {
    playPauseButton.classList.remove('playing')
    video.pause()
}

export function jumpToTime(seconds) {
    video.currentTime = seconds
}

export function handleReportStatus(timeStamp, status) {
    if (status == 'waitingForClients') {
        return
    }

    let timeDifference = video.currentTime - parseInt(timeStamp)
    if (Math.abs(timeDifference) < 5) {
        return
    }

    if (status == 'playing') {
        if (timeDifference > 10) {
            waitingForClients = true
            waitingForClientsLabel.classList.add('active')
            video.pause()
        } else {
            waitingForClients = false
            waitingForClientsLabel.classList.remove('active')
            video.play()
        }
    }
}

video.ontimeupdate = () => {
    let percentage = video.currentTime / video.duration
    timeSlider.value = percentage * 1000

    currentTimeLabel.textContent = formatTime(video.currentTime)
}

timeSlider.oninput = () => {
    let percentage = timeSlider.value / 1000
    video.currentTime = parseInt(percentage * video.duration)

    sendMessage('jumpToTime', video.currentTime.toString())
}

video.ondurationchange = () => {
    durationLabel.textContent = formatTime(video.duration)
}

setInterval(() => {
    let videoURL = video.getAttribute('src')
    if (!videoURL) {
        return
    }

    let timeStamp = video.currentTime.toString()

    if (waitingForClients) {
        status = 'waitingForClients'
    } else {
        status = video.paused ? 'paused' : 'playing'
    }

    sendMessage('reportStatus', `${timeStamp}-${status}`)
}, 5000)