import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setVideoUrl } from '../redux/actions/video';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingForClients: false,
            videoURL: 'https://pdvideosdaserste-a.akamaihd.net/de/2019/11/29/7d53ce2b-8662-4c07-85e6-090d7e7f1760/512-1_565546.mp4'
        }
    }

    submitVideoURL = () => {
        this.props.setVideoUrl(this.state.videoURL)
    }

    render() {
        let waitingForClients = this.props.videoPlaybackState === 'waiting'

        return (
            <div className="side-bar" style={styles.container}>
                <h1 style={styles.heading}>
                    <span>WatchEnsemble</span>
                    <div style={{ ...styles.connectionIndicator, background: this.props.isWebsocketConnected ? 'green' : 'red' }}></div>
                </h1>

                <main style={styles.main}>
                    <div style={styles.setVideoWrapper}>
                        <input style={styles.setVideoInput} value={this.state.videoURL} onChange={e => this.setState({ videoURL: e.target.value })} type="url" />
                        <button style={styles.setVideoButton} onClick={this.submitVideoURL}>Set Video</button>
                    </div>

                    {waitingForClients && <p style={styles.waitingForClients}>Waiting for other clients ...</p>}
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

const mapStateToProps = state => ({
    isWebsocketConnected: state.websocket.isConnected,
    videoPlaybackState: state.video.playbackState
})

const mapDispatchToProps = {
    setVideoUrl
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)