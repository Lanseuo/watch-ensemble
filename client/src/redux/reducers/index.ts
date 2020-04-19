import { combineReducers } from 'redux'
import main from './main'
import video from './video'
import websocket from './websocket'

const rootReducer = combineReducers({
    main,
    video,
    websocket
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer