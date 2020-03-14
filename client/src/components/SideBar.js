import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestVideo } from '../redux/actions/video'
import ChooseLanguage from './ChooseLanguage'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoURL: 'https://www.arte.tv/de/videos/091142-010-A/stadt-land-kunst-spezial/'
        }
    }

    submitVideoURL = () => {
        requestVideo(this.state.videoURL)
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

                    {this.props.videoDetails && (
                        <div>
                            <h3>{this.props.videoDetails.title[this.props.language]}</h3>
                            <p>{this.props.videoDetails.description[this.props.language]}</p>
                            <ChooseLanguage />
                        </div>
                    )}
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
    language: state.video.language,
    videoDetails: state.video.details,
    videoPlaybackState: state.video.playbackState,
    isWebsocketConnected: state.websocket.isConnected
})

export default connect(mapStateToProps)(SideBar)