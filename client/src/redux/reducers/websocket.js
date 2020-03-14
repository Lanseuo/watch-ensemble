import { SET_WEBSOCKET, SET_IS_CONNECTED } from "../actionTypes/websocket"

const initialState = {
    ws: null,
    isConnected: false,
    clientId: Math.random().toString(36).substring(7)
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_WEBSOCKET:
            return {
                ...state,
                ws: action.payload
            }

        case SET_IS_CONNECTED:
            return {
                ...state,
                isConnected: action.payload
            }

        default:
            return state
    }
}
