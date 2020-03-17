import React, { Component } from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'

import styles from './SideBar.module.css'
import Modal from './Modal'
import { requestVideo } from '../redux/actions/video'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoURL: 'https://www.arte.tv/de/videos/091142-010-A/stadt-land-kunst-spezial/',
            showModal: false
        }

        PubSub.subscribe('openSetVideoModal', () => {
            this.setState({ showModal: true })
        })
    }

    submitVideoURL = () => {
        this.setState({ showModal: false })
        requestVideo(this.state.videoURL)
    }

    render() {
        let waitingForClients = this.props.videoPlaybackState === 'waiting'

        return (
            <aside className={styles.container}>
                <h1 className={styles.heading}>Watch<br />Ensemble</h1>

                <div className={styles.wrapper}>
                    <div className={styles.connectionIndicator} style={{ background: this.props.isWebsocketConnected ? 'green' : 'red' }}></div>
                </div>

                <div className={styles.wrapper} onClick={() => this.setState({ showModal: true })}>
                    <p className={styles.showButton}>Set Video</p>
                </div>

                <Modal title="Set Video" show={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                    <p>Paste the url of an ARTE video below to start watching</p>
                    <input className={styles.setVideoInput} value={this.state.videoURL} onChange={e => this.setState({ videoURL: e.target.value })} type="url" placeholder="https://www.arte.tv/fr/videos/012345-678-A/mon-video" />
                    <div className="button-wrapper right">
                        <button className={styles.setVideoButton} onClick={this.submitVideoURL}>Set Video</button>
                    </div>
                </Modal>

                <div className={styles.setVideoWrapper}>
                </div>

                {waitingForClients && <p className={styles.waitingForClients}>Waiting for other clients ...</p>}
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    language: state.video.language,
    videoDetails: state.video.details,
    videoPlaybackState: state.video.playbackState,
    isWebsocketConnected: state.websocket.isConnected
})

export default connect(mapStateToProps)(SideBar)