import { SET_SHOW_LANGUAGE_MODAL, SET_IS_TOUCH_DEVICE, SET_USER_NAME } from "../actionTypes/main"

const initialState = {
    showLanguageModal: false,
    isTouchDevice: false,
    userName: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_LANGUAGE_MODAL:
            return {
                ...state,
                showLanguageModal: action.payload
            }

        case SET_IS_TOUCH_DEVICE:
            return {
                ...state,
                isTouchDevice: action.payload
            }

        case SET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            }

        default:
            return state
    }
}
