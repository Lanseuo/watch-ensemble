export interface Message {
    type: 'received' | 'sent'
    author: string
    text: string
}

export interface ChatState {
    showChatWindow: boolean
    messages: Message[]
}

export const SET_SHOW_CHAT_WINDOW = 'SET_SHOW_CHAT_WINDOW'
export const ADD_MESSAGE = 'ADD_MESSAGE'

export interface SetShowChatWindowAction {
    type: typeof SET_SHOW_CHAT_WINDOW
    payload: boolean
}

export interface AddMessageAction {
    type: typeof ADD_MESSAGE
    payload: Message
}

export type ChatActionTypes = SetShowChatWindowAction | AddMessageAction