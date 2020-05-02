import {
    VideoActionTypes, Language, PlaybackState,
    SET_LANGUAGE, SET_PLAYBACK_STATE, SET_CURRENT_TIME, SET_TOTAL_TIME,
    SET_BUFFER_TIME, SET_JUMP_TO_TIME_LAST_UPDATE, SET_IS_LOADING
} from '../types/video'
import { sendMessageToWebsocket } from './websocket'
import store from '../store'


export const setLanguage = (language: Language): VideoActionTypes => ({
    type: SET_LANGUAGE,
    payload: language
})

export const togglePlay = () => {
    switch (store.getState().video.playbackState) {
        case 'playing':
            return setPlaybackState('paused')
        case 'paused':
            return setPlaybackState('playing')
        default:
            console.error(store.getState().video.playbackState)
    }
}

export const setPlaybackState = (content: PlaybackState) => {
    switch (content) {
        case 'playing':
            sendMessageToWebsocket('setPlaybackState', { text: 'playing' })
            break
        case 'paused':
            sendMessageToWebsocket('setPlaybackState', { text: 'paused' })
            break
        default:
            console.error('Playback state of unknown type', content)
    }

    return setPlaybackStateWithoutMessage(content)
}

export const setPlaybackStateWithoutMessage = (content: PlaybackState): VideoActionTypes => ({
    type: SET_PLAYBACK_STATE,
    payload: content
})


export const requestVideo = (url: string) => {
    sendMessageToWebsocket('requestVideo', { text: url })
}

export const setVideoCurrentTime = (seconds: number): VideoActionTypes => ({
    type: SET_CURRENT_TIME,
    payload: seconds
})

export const setVideoTotalTime = (seconds: number): VideoActionTypes => ({
    type: SET_TOTAL_TIME,
    payload: seconds
})

export const setVideoBufferTime = (seconds: number): VideoActionTypes => ({
    type: SET_BUFFER_TIME,
    payload: seconds
})


export const jumpToTime = (seconds: number): VideoActionTypes => {
    sendMessageToWebsocket('jumpToTime', { seconds: Math.trunc(seconds) })

    return {
        type: SET_JUMP_TO_TIME_LAST_UPDATE,
        payload: seconds
    }
}

export const setVideoJumpToTimeLastUpdate = (seconds: number): VideoActionTypes => ({
    type: SET_JUMP_TO_TIME_LAST_UPDATE,
    payload: seconds
})

export const setIsLoading = (value: boolean): VideoActionTypes => ({
    type: SET_IS_LOADING,
    payload: value
})

setInterval(() => {
    let { details, currentTime, playbackState } = store.getState().video

    if (details === null) {
        return
    }

    sendMessageToWebsocket('reportStatus', {
        status: {
            playbackState,
            currentTime: Math.trunc(currentTime)
        }
    })
}, 5000)