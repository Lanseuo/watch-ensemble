import { SET_PLAYBACK_STATE, SET_WEBSOCKET, SET_IS_WEBSOCKET_CONNECTED } from "../actionTypes"

const initialState = {
    videoPlaybackState: 'paused',
    ws: null,
    isWebsocketConnected: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PLAYBACK_STATE:
            return {
                ...state,
                videoPlaybackState: action.payload
            }

        case SET_WEBSOCKET:
            return {
                ...state,
                ws: action.payload
            }

        case SET_IS_WEBSOCKET_CONNECTED:
            return {
                ...state,
                isWebsocketConnected: action.payload
            }

        default:
            return state
    }
}
