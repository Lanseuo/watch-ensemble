import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestVideo } from '../redux/actions/video'
import Modal from './Modal'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoURL: 'https://www.arte.tv/de/videos/091142-010-A/stadt-land-kunst-spezial/',
            showModal: false
        }
    }

    submitVideoURL = () => {
        this.setState({ showModal: false })
        requestVideo(this.state.videoURL)
    }

    render() {
        let waitingForClients = this.props.videoPlaybackState === 'waiting'

        return (
            <aside className="side-bar" style={styles.container}>
                <h1 style={styles.heading}>Watch<br />Ensemble</h1>

                <div style={styles.wrapper}>
                    <div style={{ ...styles.connectionIndicator, background: this.props.isWebsocketConnected ? 'green' : 'red' }}></div>
                </div>

                <div style={styles.wrapper} onClick={() => this.setState({ showModal: true })}>
                    <p style={styles.showButton}>Show</p>
                </div>

                <Modal title="Set Video" show={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                    <input style={styles.setVideoInput} value={this.state.videoURL} onChange={e => this.setState({ videoURL: e.target.value })} type="url" />
                    <div className="button-wrapper">
                        <button style={styles.setVideoButton} onClick={this.submitVideoURL}>Set Video</button>
                    </div>
                </Modal>

                <div style={styles.setVideoWrapper}>
                </div>

                {waitingForClients && <p style={styles.waitingForClients}>Waiting for other clients ...</p>}
            </aside>
        )
    }
}

const styles = {
    container: {
        background: 'var(--dark-background-color-darker)'
    },

    heading: {
        margin: 0,
        padding: '15px 1px',
        background: '#ff9f1c',
        textAlign: 'center',
        fontSize: 10
    },

    wrapper: {
        display: 'grid',
        placeItems: 'center',
        height: 60,
        borderBottom: '0.5px solid gray'
    },

    connectionIndicator: {
        width: 15,
        height: 15,
        borderRadius: 10
    },

    showButton: {
        cursor: 'pointer'
    },

    setVideoWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridColumnGap: 10,
        marginBottom: 10
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