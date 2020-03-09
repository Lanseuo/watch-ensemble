import { sendMessage } from './socket.js'
let video = document.getElementById('video')

export function setVideo(url) {
    let videoWrapper = document.getElementsByClassName('video-wrapper')[0]
    videoWrapper.classList.add('active')

    video.setAttribute('src', url)
}

export function play() {
    video.play()
}

export function pause() {
    video.pause()
}

export function jumpToTime(timeStamp) {
    video.currentTime = timeStamp
}

video.onpause = () => {
    sendMessage('pause')
}

video.onplay = () => {
    sendMessage('play')
}

video.onseeked = event => {
    sendMessage('jumpToTime', event.timeStamp.toString())
}