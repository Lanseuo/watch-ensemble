export interface Notification {
    type: 'info' | 'success' | 'error'
    title: string
    message: string
}

export interface MainState {
    showLanguageModal: boolean
    isTouchDevice: boolean
    userName: string | null
    notification: Notification | null
    clients: string[]
}

export const SET_SHOW_LANGUAGE_MODAL = 'SET_SHOW_LANGUAGE_MODAL'
export const SET_IS_TOUCH_DEVICE = 'SET_IS_TOUCH_DEVICE'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const SET_CLIENTS = 'SET_CLIENTS'

export interface SetShowLanguageModalAction {
    type: typeof SET_SHOW_LANGUAGE_MODAL
    payload: boolean
}

export interface SetIsTouchDeviceAction {
    type: typeof SET_IS_TOUCH_DEVICE
    payload: boolean
}

export interface SetUserNameAction {
    type: typeof SET_USER_NAME
    payload: string
}

export interface SetNotificationAction {
    type: typeof SET_NOTIFICATION
    payload: Notification | null
}

export interface SetClientsAction {
    type: typeof SET_CLIENTS
    payload: string[]
}

export type MainActionTypes = SetShowLanguageModalAction | SetIsTouchDeviceAction | SetUserNameAction | SetNotificationAction | SetClientsAction