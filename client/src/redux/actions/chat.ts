import { ChatActionTypes, Message, SET_SHOW_CHAT_WINDOW, ADD_MESSAGE } from '../types/chat'
import { sendMessageToWebsocket } from './websocket'
import store from '../store'

export const setShowChatWindow = (show: boolean): ChatActionTypes => ({
    type: SET_SHOW_CHAT_WINDOW,
    payload: show
})

export const addMessage = (message: Message): ChatActionTypes => ({
    type: ADD_MESSAGE,
    payload: message
})

export const sendMessage = (messageText: string): ChatActionTypes => {
    sendMessageToWebsocket('chatMessage', { text: messageText })

    return addMessage({
        type: 'sent',
        author: '',
        text: messageText
    })
}

export const receivedMessage = (message: Message) => {
    store.dispatch(addMessage(message))
}