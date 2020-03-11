import React, { Component } from 'react';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWebsocketConnected: false,
            waitingForClients: false
        }
    }

    render() {
        return (
            <div className="side-bar" style={styles.container}>
                <h1 style={styles.heading}>
                    <span>WatchEnsemble</span>
                    <div style={{ ...styles, background: this.state.isWebsocketConnected ? 'green' : 'red' }}></div>
                </h1>

                <main style={styles.main}>
                    <div style={styles.setVideoWrapper}>
                        <input style={styles.setVideoInput} type="url"
                            defaultValue="https://pdvideosdaserste-a.akamaihd.net/de/2019/11/29/7d53ce2b-8662-4c07-85e6-090d7e7f1760/512-1_565546.mp4" />
                        <button style={styles.setVideoButton}>Set Video</button>
                    </div>

                    {this.state.waitingForClients && <p style={styles.waitingForClients}>Waiting for other clients ...</p>}
                </main>
            </div>
        )
    }
}

const styles = {
    container: {
        borderLeft: '5px solid white'
    },

    heading: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        placeItems: 'center',

        margin: 0,
        padding: '15px 10px',
        background: '#ff9f1c',
        textAlign: 'center'
    },

    connectionIndicator: {
        width: 10,
        height: 10,
        borderRadius: 10
    },

    main: {
        margin: '30px 10px'
    },

    setVideoWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridColumnGap: 10,
        marginBottom: 10
    },

    setVideoInput: {
        padding: 5
    },

    setVideoButton: {
        background: '#ff9f1c',
        boxShadow: null,
        border: 0,
        color: 'white'
    },

    waitingForClients: {
        color: 'red',
        textAlign: 'center'
    }
}

export default SideBar;