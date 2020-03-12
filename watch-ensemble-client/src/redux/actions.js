import { SET_PLAYBACK_STATE, SET_WEBSOCKET, SET_IS_WEBSOCKET_CONNECTED } from './actionTypes'
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

    console.log('Got message', message)
}

export const setPlaybackState = content => ({
    type: SET_PLAYBACK_STATE,
    payload: content
})