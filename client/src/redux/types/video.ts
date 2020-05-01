export type PlaybackState = 'playing' | 'paused' | 'waiting'
export type Language = '' | 'de' | 'fr' | 'undefined'
export interface VideoDetails {
    title: Record<Language, string>
    source: string
    description: Record<Language, string>
    url: Record<Language, string>
    languages: string[]
    aspectRatioWidth: number
    aspectRatioHeight: number
}

export interface VideoState {
    language: Language,
    details: VideoDetails | null,
    playbackState: PlaybackState,
    currentTime: number,
    totalTime: number,
    bufferTime: number,
    jumpToTimeLastUpdate: number
}

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_DETAILS = 'SET_DETAILS'
export const SET_PLAYBACK_STATE = 'SET_PLAYBACK_STATE'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const SET_TOTAL_TIME = 'SET_TOTAL_TIME'
export const SET_BUFFER_TIME = 'SET_BUFFER_TIME'
export const SET_JUMP_TO_TIME_LAST_UPDATE = 'SET_JUMP_TO_TIME_LAST_UPDATE'

export interface SetLanguageAction {
    type: typeof SET_LANGUAGE
    payload: Language
}

export interface SetDetailsAction {
    type: typeof SET_DETAILS
    payload: {
        videoDetails: VideoDetails
        seconds: number
        playbackState: PlaybackState
    }
}

export interface SetPlaybackStateAction {
    type: typeof SET_PLAYBACK_STATE
    payload: PlaybackState
}

export interface SetCurrentTimeAction {
    type: typeof SET_CURRENT_TIME
    payload: number
}

export interface SetTotalTimeAction {
    type: typeof SET_TOTAL_TIME
    payload: number
}

export interface SetBufferTimeAction {
    type: typeof SET_BUFFER_TIME
    payload: number
}

export interface SetJumpToTimeLastUpdateAction {
    type: typeof SET_JUMP_TO_TIME_LAST_UPDATE
    payload: number
}

export type VideoActionTypes = SetLanguageAction | SetDetailsAction | SetPlaybackStateAction | SetCurrentTimeAction | SetTotalTimeAction | SetBufferTimeAction | SetJumpToTimeLastUpdateAction