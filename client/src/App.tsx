import React, { Component } from 'react'

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

import { setIsTouchDevice } from './redux/actions/main'
import { connectToWebsocket } from './redux/actions/websocket'
import JoinRoomModal from './components/JoinRoomModal'
import Notification from './components/Notification'

interface State {
    didJoinRoom: boolean
}

class App extends Component<{}, State> {
    constructor(props) {
        super(props)
        setIsTouchDevice()

        this.state = {
            didJoinRoom: false
        }
    }

    joined() {
        this.setState({ didJoinRoom: true })
        connectToWebsocket()
    }

    render() {
        return (
            <div style={styles.container}>
                <SideBar />
                {this.state.didJoinRoom && <MainPart />}

                <JoinRoomModal didJoinRoom={this.state.didJoinRoom} joined={this.joined} />
                <Notification />
            </div>
        )
    }
}

let styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '60px auto'
    }
}

export default App