import {
    VideoState, VideoActionTypes, Language,
    SET_LANGUAGE, SET_DETAILS, SET_PLAYBACK_STATE, SET_CURRENT_TIME,
    SET_TOTAL_TIME, SET_BUFFER_TIME, SET_JUMP_TO_TIME_LAST_UPDATE, SET_IS_LOADING
} from "../types/video"

const initialState: VideoState = {
    language: '',
    details: null,
    playbackState: 'paused',
    currentTime: 0,
    totalTime: 0,
    bufferTime: 0,
    jumpToTimeLastUpdate: 0,
    isLoading: false
}

export default function (state = initialState, action: VideoActionTypes): VideoState {
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

        case SET_DETAILS: {
            let { videoDetails, seconds, playbackState } = action.payload
            let language = videoDetails.languages.includes(state.language) ? state.language : videoDetails.languages[0] as Language
            return {
                ...state,
                playbackState: playbackState || 'paused',
                currentTime: 0,
                bufferTime: 0,
                jumpToTimeLastUpdate: seconds || 0,
                details: videoDetails,
                language
            }
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

        case SET_BUFFER_TIME:
            return {
                ...state,
                bufferTime: action.payload
            }

        case SET_JUMP_TO_TIME_LAST_UPDATE:
            let playbackState = state.playbackState === 'waiting' ? 'playing' : state.playbackState
            return {
                ...state,
                playbackState,
                currentTime: action.payload,
                jumpToTimeLastUpdate: action.payload
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return state
    }
}
