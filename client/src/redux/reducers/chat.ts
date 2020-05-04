import { ChatState, ChatActionTypes, ADD_MESSAGE, SET_SHOW_CHAT_WINDOW } from "../types/chat"

const initialState: ChatState = {
    showChatWindow: false,
    messages: []
}

export default function (state = initialState, action: ChatActionTypes): ChatState {
    switch (action.type) {
        case SET_SHOW_CHAT_WINDOW:
            return {
                ...state,
                showChatWindow: action.payload
            }

        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        default:
            return state
    }
}
