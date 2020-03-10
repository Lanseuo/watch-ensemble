import { sendMessage } from './socket.js'
let video = document.getElementById('video')
let playPauseButton = document.getElementById('play-pause')
let timeSlider = document.getElementById('time-slider')

let waitingForClients = false

export function setVideo(url) {
    video.setAttribute('src', url)
    timeSlider.value = 0
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

export function handleReportStatus(timeStamp, status) {
    if (status == 'waitingForClients') {
        return
    }

    let timeDifference = video.currentTime - parseInt(timeStamp)
    if (Math.abs(timeDifference) < 5) {
        return
    }

    if (status == 'playing') {
        if (timeDifference > 5) {
            waitingForClients = true
            video.pause()
        } else {
            waitingForClients = false
            video.play()
        }
    }
}

video.ontimeupdate = event => {
    let percentage = video.currentTime / video.duration
    timeSlider.value = percentage * 100
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