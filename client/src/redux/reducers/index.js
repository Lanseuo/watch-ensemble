import { combineReducers } from 'redux'
import main from './main'
import video from './video'
import websocket from './websocket'

export default combineReducers({
    main,
    video,
    websocket
})