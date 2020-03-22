import React, { Component } from 'react'

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

import { setIsTouchDevice } from './redux/actions/main'
import { connectToWebsocket } from './redux/actions/websocket'

class App extends Component {
    constructor() {
        super()
        setIsTouchDevice()
        connectToWebsocket()
    }

    render() {
        return (
            <div style={styles.container}>
                <SideBar />
                <MainPart />
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