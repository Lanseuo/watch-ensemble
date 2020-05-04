import { ChatActionTypes, Message, SET_SHOW_CHAT_WINDOW, ADD_MESSAGE } from '../types/chat'

export const setShowChatWindow = (show: boolean): ChatActionTypes => ({
    type: SET_SHOW_CHAT_WINDOW,
    payload: show
})

export const addMessage = (message: Message) => ({
    type: ADD_MESSAGE,
    payload: message
})

export const sendMessage = (messageText: string) => {
    return {
        type: ADD_MESSAGE,
        payload: {
            type: 'sent',
            author: '',
            text: messageText
        }
    }
}