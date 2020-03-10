import { setVideo, play, pause, jumpToTime, handleReportStatus } from "./video.js"

let clientID = Math.random().toString(36).substring(7)
let socket = new WebSocket('ws://localhost:8080/ws')
console.log('Attempting WebSocket Connection')

let connectionIndicator = document.getElementById('connection-indicator')

socket.onopen = () => {
    connectionIndicator.classList.add('active')
    console.log('Successfully connected')
}

socket.onmessage = event => {
    let message = JSON.parse(event.data)

    let sentFromCurrentClient = message.clientID == clientID
    if (sentFromCurrentClient) {
        return
    }

    switch (message.type) {
        case 'setVideo':
            setVideo(message.text)
            break
        case 'play':
            play()
            break
        case 'pause':
            pause()
            break
        case 'jumpToTime':
            jumpToTime(message.text)
            break;
        case 'reportStatus':
            let timeStamp = parseFloat(message.text.split("-")[0])
            let status = message.text.split("-")[1]
            handleReportStatus(timeStamp, status)
            break
        default:
            console.log('Message of unknown type', message.type);

    }
    console.log('Got message', message)
}

socket.onclose = event => {
    connectionIndicator.classList.remove('active')
    console.log('Socket closed connection', event)
}

socket.onerror = error => {
    connectionIndicator.classList.remove('active')
    console.log('Socket error', error)
}

export function sendMessage(type, text) {
    let message = {
        type,
        text,
        clientID,
        date: Date.now()
    }

    socket.send(JSON.stringify(message))
}