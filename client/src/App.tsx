import React, { Component } from 'react'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'
import JoinRoomModal from './components/JoinRoomModal'
import Notification from './components/Notification'

import { setIsTouchDevice } from './redux/actions/main'
import { connectToWebsocket } from './redux/actions/websocket'

interface Props { }

interface State {
    didJoinRoom: boolean
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        setIsTouchDevice()

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
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <p>Home</p>
                    </Route>
                    <Route path="/room" exact>
                        <div style={styles.container}>
                            <SideBar />
                            {this.state.didJoinRoom && <MainPart />}

                            <JoinRoomModal didJoinRoom={this.state.didJoinRoom} joined={this.joined} />
                            <Notification />
                        </div>
                    </Route>
                </Switch>
            </Router>
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