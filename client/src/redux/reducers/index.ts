import { combineReducers } from 'redux'
import main from './main'
import chat from './chat'
import video from './video'
import websocket from './websocket'

const rootReducer = combineReducers({
    main,
    chat,
    video,
    websocket
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer