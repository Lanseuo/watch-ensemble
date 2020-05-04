import { ChatState, ChatActionTypes, ADD_MESSAGE, SET_SHOW_CHAT_WINDOW } from "../types/chat"

const initialState: ChatState = {
    showChatWindow: false,
    hasUnreadMessages: false,
    messages: []
}

export default function (state = initialState, action: ChatActionTypes): ChatState {
    switch (action.type) {
        case SET_SHOW_CHAT_WINDOW:
            return {
                ...state,
                showChatWindow: action.payload,
                hasUnreadMessages: false
            }

        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                hasUnreadMessages: state.showChatWindow === false
            }

        default:
            return state
    }
}
