import { SET_SHOW_LANGUAGE_MODAL } from "../actionTypes/main"

const initialState = {
    showLanguageModal: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_LANGUAGE_MODAL:
            return {
                ...state,
                showLanguageModal: action.payload
            }

        default:
            return state
    }
}
