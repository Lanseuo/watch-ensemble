import { SET_PLAYBACK_STATE, SET_WEBSOCKET, SET_IS_WEBSOCKET_CONNECTED, SET_VIDEO_URL } from "../actionTypes"

const initialState = {
    videoPlaybackState: 'paused',
    ws: null,
    isWebsocketConnected: false,
    videoUrl: null,
    clientId: Math.random().toString(36).substring(7)
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

        case SET_VIDEO_URL:
            return {
                ...state,
                videoUrl: action.payload
            }

        default:
            return state
    }
}
