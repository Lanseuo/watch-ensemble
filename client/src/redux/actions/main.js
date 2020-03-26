import { SET_SHOW_LANGUAGE_MODAL, SET_IS_TOUCH_DEVICE, SET_USER_NAME } from '../actionTypes/main'
import { isTouchDevice } from '../../utils'
import store from '../store'

export const setShowLanguageModal = show => ({
    type: SET_SHOW_LANGUAGE_MODAL,
    payload: show
})

export const setIsTouchDevice = () => {
    let value = isTouchDevice()

    let bodyElement = document.querySelector('body')
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

export const setUserName = name => ({
    type: SET_USER_NAME,
    payload: name
})