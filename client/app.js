import { setVideo } from './video.js'
import { sendMessage } from './socket.js'


let urlInput = document.getElementById('url')
let setVideoButton = document.getElementById('set-video-button')
setVideoButton.addEventListener('click', () => {
    let url = urlInput.value
    sendMessage('setVideo', url)
    setVideo(url)
})