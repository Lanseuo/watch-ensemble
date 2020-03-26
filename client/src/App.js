import React, { Component } from 'react'

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

import { setIsTouchDevice } from './redux/actions/main'
import { connectToWebsocket } from './redux/actions/websocket'
import JoinRoomModal from './components/JoinRoomModal'

class App extends Component {
    constructor() {
        super()
        setIsTouchDevice()

        this.state = {
            didUserJoinRoom: false
        }
    }

    userJoined = () => {
        this.setState({ didUserJoinRoom: true })
        connectToWebsocket()
    }

    render() {
        return (
            <div style={styles.container}>
                <SideBar />
                {this.state.didUserJoinRoom && <MainPart />}

                <JoinRoomModal didUserJoinRoom={this.state.didUserJoinRoom} userJoined={this.userJoined} />
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