import { setVideo, play, pause, jumpToTime, handleReportStatus } from "./video.js"

let clientID = Math.random().toString(36).substring(7)
let socket

let connectionIndicator = document.getElementById('connection-indicator')

function connect() {
    console.log('Attempting WebSocket connection ...')
    socket = new WebSocket(`ws://${window.location.hostname}:8080/ws`)
    socket.onopen = handleOpen
    socket.onerror = handleError
    socket.onclose = handleClose
    socket.onmessage = handleMessage
}
connect()

function handleOpen() {
    connectionIndicator.classList.add('active')
    console.log('Successfully connected')
}

function handleError(error) {
    connectionIndicator.classList.remove('active')
    console.log('Socket error', error)
}

function handleClose(event) {
    connectionIndicator.classList.remove('active')
    console.log('Socket closed connection', event)

    setTimeout(connect, 1000)
}

function handleMessage(event) {
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

export function sendMessage(type, text) {
    let message = {
        type,
        text,
        clientId,
        date: Date.now()
    }

    socket.send(JSON.stringify(message))
}