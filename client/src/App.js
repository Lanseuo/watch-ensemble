import React, { Component } from 'react'

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

import { setIsTouchDevice } from './redux/actions/main'
import { connectToWebsocket } from './redux/actions/websocket'

class App extends Component {
    constructor() {
        super()
        setIsTouchDevice()

        this.state = {
            didUserJoinRoom: false
        }
    }

    joinRoom = () => {
        this.setState({ didUserJoinRoom: true })
        connectToWebsocket()
    }

    render() {
        return (
            <div style={styles.container}>
                <SideBar />
                {this.state.didUserJoinRoom && <MainPart />}
                {!this.state.didUserJoinRoom &&
                    <div style={styles.joinRoomWrapper}>
                        <div className="button-wrapper">
                            <button onClick={this.joinRoom}>Join Room</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

let styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '60px auto'
    },

    joinRoomWrapper: {
        display: 'grid',
        placeItems: 'center'
    }
}

export default App