import { ChatState, ChatActionTypes, ADD_MESSAGE, SET_SHOW_CHAT_WINDOW } from "../types/chat"

const initialState: ChatState = {
    showChatWindow: false,
    message: [
        {
            type: 'received',
            author: 'User 1',
            text: 'Message 1'
        },
        {
            type: 'received',
            author: 'User 2',
            text: 'Message 2'
        },
        {
            type: 'sent',
            author: '',
            text: 'Message 3'
        },
        {
            type: 'received',
            author: 'User 3',
            text: 'Message 4'
        }
    ]
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
                message: []
            }

        default:
            return state
    }
}
