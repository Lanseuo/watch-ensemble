import React, { Component } from 'react'

import SideBar from './SideBar'
import MainPart from './MainPart'
import JoinRoomModal from './JoinRoomModal'
import Notification from './Notification'
import Chat from './../../components/Chat/Chat'

import { connectToWebsocket } from '../../redux/actions/websocket'

interface Props {
}

interface State {
    didJoinRoom: boolean
}

class Room extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            didJoinRoom: false
        }
    }

    joined = () => {
        this.setState({ didJoinRoom: true })
        connectToWebsocket()
    }

    render() {
        return (
            <div style={styles.container}>
                <SideBar />
                {this.state.didJoinRoom && <MainPart />}
                {this.state.didJoinRoom && true && <Chat />}

                <JoinRoomModal didJoinRoom={this.state.didJoinRoom} joined={this.joined} />
                <Notification />
            </div>
        )
    }
}

let styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '60px 1fr auto'
    }
}

export default Room