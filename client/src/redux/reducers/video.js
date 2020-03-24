import {
    SET_LANGUAGE, SET_DETAILS, SET_PLAYBACK_STATE, SET_CURRENT_TIME,
    SET_TOTAL_TIME, SET_JUMP_TO_TIME_LAST_UPDATE
} from "../actionTypes/video"

const initialState = {
    language: '',
    details: null,
    playbackState: 'paused',
    currentTime: 0,
    totalTime: 0,
    jumpToTimeLastUpdate: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }

        case SET_PLAYBACK_STATE:
            return {
                ...state,
                playbackState: action.payload
            }

        case SET_DETAILS:
            let language = action.payload.languages.includes(state.language) ? state.language : action.payload.languages[0]
            return {
                ...state,
                jumpToTimeLastUpdate: 0,
                details: action.payload,
                language
            }

        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            }

        case SET_TOTAL_TIME:
            return {
                ...state,
                totalTime: action.payload
            }

        case SET_JUMP_TO_TIME_LAST_UPDATE:
            let playbackState = state.playbackState == 'waiting' ? 'playing' : state.playbackState
            return {
                ...state,
                playbackState,
                currentTime: action.payload,
                jumpToTimeLastUpdate: action.payload
            }

        default:
            return state
    }
}
