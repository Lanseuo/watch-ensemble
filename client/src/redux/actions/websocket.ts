import { SET_CLIENTS } from '../types/main'
import { SET_WEBSOCKET, SET_IS_CONNECTED } from '../types/websocket'
import { SET_DETAILS, SET_PLAYBACK_STATE, SET_JUMP_TO_TIME_LAST_UPDATE } from '../types/video'
import store from '../store'
import { setNotification } from './main'
import { receivedMessage } from './chat'

export const connectToWebsocket = () => {
    console.log('Attempting WebSocket connection ...')
    let protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
    let host = process.env.NODE_ENV === 'development' ? `${window.location.hostname}:8080` : window.location.host
    let clientId = store.getState().websocket.clientId
    let socket = new WebSocket(`${protocol}://${host}/ws?clientId=${clientId}`)

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

    sendMessageToWebsocket('join', { text: store.getState().main.userName })
}

function handleError(error: Event) {
    console.error('Socket error', error)
}

function handleClose(event: CloseEvent) {
    console.error('Socket closed connection', event)
    store.dispatch({
        type: SET_IS_CONNECTED,
        payload: false
    })

    setTimeout(connectToWebsocket, 1000)
}

function handleMessage(event: MessageEvent) {
    let message = JSON.parse(event.data)

    console.log('Got message', message)

    switch (message.type) {
        case 'clientJoined':
            store.dispatch(setNotification('info', `${message.text} joined the room`, ''))
            break

        case 'clientLeft':
            store.dispatch(setNotification('info', `${message.text} left the room`, ''))
            break

        case 'setClientList':
            store.dispatch({
                type: SET_CLIENTS,
                payload: message.clientList
            })
            break

        case 'setVideoDetails':
            store.dispatch({
                type: SET_DETAILS,
                payload: message
            })
            break

        case 'setPlaybackState':
            store.dispatch({
                type: SET_PLAYBACK_STATE,
                payload: message.text
            })
            break

        case 'jumpToTime':
            store.dispatch({
                type: SET_JUMP_TO_TIME_LAST_UPDATE,
                payload: message.seconds
            })
            break

        case 'chatMessage':
            receivedMessage({ type: 'received', author: message.sourceClient, text: message.text })
            break

        case 'error':
            store.dispatch(setNotification('error', 'Error', message.text))
            break

        default:
            console.error('Message of unknown type', message.type)
    }
}

export function sendMessageToWebsocket(type: string, data: object) {
    let { ws, isConnected, clientId } = store.getState().websocket

    let message = {
        type,
        ...data,
        clientId,
        date: Date.now()
    }

    if (!isConnected) {
        console.log('Can\'t send message to websocket:', message)
        return
    }
    ws!.send(JSON.stringify(message))
}