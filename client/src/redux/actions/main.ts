import { MainActionTypes, SET_SHOW_LANGUAGE_MODAL, SET_IS_TOUCH_DEVICE, SET_USER_NAME, SET_NOTIFICATION } from '../types/main'
import { isTouchDevice } from '../../utils'
import store from '../store'

export const setShowLanguageModal = (show: boolean): MainActionTypes => ({
    type: SET_SHOW_LANGUAGE_MODAL,
    payload: show
})

export const setIsTouchDevice = () => {
    let value = isTouchDevice()

    let bodyElement = document.querySelector('body')!
    if (value) {
        bodyElement.classList.add('touch-device')
    } else {
        bodyElement.classList.remove('touch-device')
    }

    store.dispatch({
        type: SET_IS_TOUCH_DEVICE,
        payload: value
    })
}

export const setUserName = (name: string): MainActionTypes => ({
    type: SET_USER_NAME,
    payload: name
})

let notificationDeletionTimer: NodeJS.Timeout
export const setNotification = (type: 'info' | 'error', title: string, message: string): MainActionTypes => {
    let timeoutSeconds = type === 'error' ? 5000 : 1500

    clearTimeout(notificationDeletionTimer)
    notificationDeletionTimer = setTimeout(() => {
        store.dispatch(deleteNotification())
    }, timeoutSeconds)

    return {
        type: SET_NOTIFICATION,
        payload: { type, title, message }
    }
}

export const deleteNotification = (): MainActionTypes => ({
    type: SET_NOTIFICATION,
    payload: null
})