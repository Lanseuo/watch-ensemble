import {
    WebsocketState, VideoActionTypes,
    SET_WEBSOCKET, SET_IS_CONNECTED
} from "../types/websocket"

const initialState: WebsocketState = {
    ws: null,
    isConnected: false,
    clientId: Math.random().toString(36).substring(7)
}

export default function (state = initialState, action: VideoActionTypes): WebsocketState {
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
