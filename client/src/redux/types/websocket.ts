export interface WebsocketState {
    ws: WebSocket | null
    isConnected: boolean
    clientId: string
}

export const SET_WEBSOCKET = 'SET_WEBSOCKET'
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'

export interface SetWebsocketAction {
    type: typeof SET_WEBSOCKET
    payload: WebSocket
}

export interface SetIsConnectedAction {
    type: typeof SET_IS_CONNECTED
    payload: boolean
}

export type VideoActionTypes = SetWebsocketAction | SetIsConnectedAction