import React, { Component } from 'react'
import './App.css'

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

import { connect } from 'react-redux'
import { connectToWebsocket } from './redux/actions/websocket'

class App extends Component {
    constructor(props) {
        super(props);

        this.props.connectToWebsocket()

        this.state = {}
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

const mapDispatchToProps = {
    connectToWebsocket
}

export default connect(null, mapDispatchToProps)(App)