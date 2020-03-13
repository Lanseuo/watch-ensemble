import {
    SET_PLAYBACK_STATE, SET_WEBSOCKET, SET_IS_WEBSOCKET_CONNECTED,
    SET_VIDEO_URL, SET_VIDEO_CURRENT_TIME, SET_VIDEO_TOTAL_TIME
} from './actionTypes'
import store from './store'

export const connectToWebsocket = () => {
    console.log('Attempting WebSocket connection ...')
    let socket = new WebSocket(`ws://${window.location.hostname}:8080/ws`)

    socket.onopen = handleOpen
    socket.onerror = handleError
    socket.onclose = handleClose
    socket.onmessage = handleMessage

    return {
        type: SET_WEBSOCKET,
        payload: socket
    }
}

function handleOpen() {
    console.log('Successfully connected')
    store.dispatch({
        type: SET_IS_WEBSOCKET_CONNECTED,
        payload: true
    })
}

function handleError(error) {
    console.log('Socket error', error)
}

function handleClose(event) {
    console.log('Socket closed connection', event)
    store.dispatch({
        type: SET_IS_WEBSOCKET_CONNECTED,
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
        case 'setVideo':
            store.dispatch({
                type: SET_VIDEO_URL,
                payload: message.text
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

        default:
            console.error('Message of unknown type', message.type);
    }
}

export const setPlaybackState = content => {
    switch (content) {
        case 'playing':
            sendMessageToWebsocket('play')
            break
        case 'paused':
            sendMessageToWebsocket('pause')
            break
        default:
            console.error('Playback state of unknown type', content);
    }

    return {
        type: SET_PLAYBACK_STATE,
        payload: content
    }
}

export const setVideoUrl = url => {
    sendMessageToWebsocket('setVideo', url)

    return {
        type: SET_VIDEO_URL,
        payload: url
    }
}

export const setVideoCurrentTime = seconds => ({
    type: SET_VIDEO_CURRENT_TIME,
    payload: seconds
})

export const setVideoTotalTime = seconds => ({
    type: SET_VIDEO_TOTAL_TIME,
    payload: seconds
})

export function sendMessageToWebsocket(type, text) {
    let message = {
        type,
        text,
        clientId: store.getState().clientId,
        date: Date.now()
    }

    store.getState().ws.send(JSON.stringify(message))
}