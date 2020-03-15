import { SET_WEBSOCKET, SET_IS_CONNECTED } from '../actionTypes/websocket'
import { SET_DETAILS, SET_PLAYBACK_STATE, SET_JUMP_TO_TIME_LAST_UPDATE } from '../actionTypes/video'
import { handleReportStatus } from './video'
import store from '../store'

export const connectToWebsocket = () => {
    console.log('Attempting WebSocket connection ...')
    let protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
    let host = process.env.NODE_ENV === 'development' ? `${window.location.hostname}:8080` : window.location.host
    let socket = new WebSocket(`${protocol}://${host}/ws`)

    socket.onopen = handleOpen
    socket.onerror = handleError
    socket.onclose = handleClose
    socket.onmessage = handleMessage

    store.dispatch({
        type: SET_WEBSOCKET,
        payload: socket
    })
}

function handleOpen() {
    console.log('Successfully connected')
    store.dispatch({
        type: SET_IS_CONNECTED,
        payload: true
    })
}

function handleError(error) {
    console.error('Socket error', error)
}

function handleClose(event) {
    console.error('Socket closed connection', event)
    store.dispatch({
        type: SET_IS_CONNECTED,
        payload: false
    })

    setTimeout(connectToWebsocket, 1000)
}

function handleMessage(event) {
    let message = JSON.parse(event.data)

    let sentFromCurrentClient = message.clientId === store.getState().clientId
    if (sentFromCurrentClient) {
        return
    }

    console.log('Got message', message)

    switch (message.type) {
        case 'setVideoDetails':
            store.dispatch({
                type: SET_DETAILS,
                payload: message.videoDetails
            })
            break

        case 'play':
            store.dispatch({
                type: SET_PLAYBACK_STATE,
                payload: 'playing'
            })
            break

        case 'pause':
            store.dispatch({
                type: SET_PLAYBACK_STATE,
                payload: 'paused'
            })
            break

        case 'jumpToTime':
            store.dispatch({
                type: SET_JUMP_TO_TIME_LAST_UPDATE,
                payload: message.text
            })
            break

        case 'reportStatus':
            let timeStamp = parseFloat(message.text.split("-")[0])
            let status = message.text.split("-")[1]
            handleReportStatus(timeStamp, status)
            break

        default:
            console.error('Message of unknown type', message.type);
    }
}

export function sendMessageToWebsocket(type, text) {
    let { ws, isConnected, clientId } = store.getState().websocket

    let message = {
        type,
        text,
        clientId,
        date: Date.now()
    }

    if (!isConnected) {
        console.log('Can\'t send message to websocket:', message)
        return
    }
    ws.send(JSON.stringify(message))
}