import {
    SET_PLAYBACK_STATE, SET_WEBSOCKET, SET_IS_WEBSOCKET_CONNECTED,
    SET_VIDEO_URL, SET_VIDEO_CURRENT_TIME, SET_VIDEO_TOTAL_TIME
} from "../actionTypes"

const initialState = {
    videoPlaybackState: 'paused',
    ws: null,
    isWebsocketConnected: false,
    clientId: Math.random().toString(36).substring(7),
    videoUrl: null,
    videoCurrentTime: 0,
    videoTotalTime: 0
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

        case SET_VIDEO_CURRENT_TIME:
            return {
                ...state,
                videoCurrentTime: action.payload
            }

        case SET_VIDEO_TOTAL_TIME:
            return {
                ...state,
                videoTotalTime: action.payload
            }

        default:
            return state
    }
}
