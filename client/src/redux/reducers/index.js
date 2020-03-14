import { combineReducers } from 'redux'
import video from './video'
import websocket from './websocket'

export default combineReducers({
    video,
    websocket
})