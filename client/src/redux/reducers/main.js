import { SET_SHOW_LANGUAGE_MODAL, SET_IS_TOUCH_DEVICE } from "../actionTypes/main"

const initialState = {
    showLanguageModal: false,
    isTouchDevice: false
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

        default:
            return state
    }
}
