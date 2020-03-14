import React, { Component } from 'react'
import './App.css'

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

import { connectToWebsocket } from './redux/actions/websocket'

class App extends Component {
    constructor() {
        super()
        connectToWebsocket()
    }

    render() {
        return (
            <div style={styles.container}>
                <MainPart />
                <SideBar />
            </div>
        )
    }
}

let styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr'
    }
}

export default App