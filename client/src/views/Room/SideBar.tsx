import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from "react-router-dom"
import PubSub from 'pubsub-js'

import styles from './SideBar.module.css'
import Modal from './Modal'
import Clients from './Clients'
import { requestVideo } from '../../redux/actions/video'
import { AppState } from '../../redux/reducers'
import Logo from '../../logo.svg';

interface Props extends ConnectedProps<typeof connector> { }

interface State {
    videoURL: string
    showModal: boolean
}

class SideBar extends Component<Props, State> {
    constructor(props: Props) {
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
        return (
            <aside className={styles.container}>
                <Link to="/" className={styles.wrapper}>
                    <img className={styles.logo} src={Logo} alt="WatchEnsemble Logo" />
                </Link>

                <div className={styles.wrapper}>
                    <div className={styles.connectionIndicator} style={{ background: this.props.isWebsocketConnected ? 'green' : 'red' }}></div>
                </div>

                <div className={styles.wrapper} onClick={() => this.setState({ showModal: true })}>
                    <p className={styles.showButton}>Set Video</p>
                </div>

                <Modal title="Set Video" show={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                    <p>Paste the url of a video below to start watching. WatchEnsemble currently supports YouTube-, ARTE- and MP4-videos.</p>
                    <input className={styles.setVideoInput} autoFocus value={this.state.videoURL} onChange={e => this.setState({ videoURL: e.target.value })} type="url" placeholder="https://www.arte.tv/fr/videos/012345-678-A/ma-vidéo" />
                    <div className="button-wrapper right">
                        <button className={styles.setVideoButton} onClick={this.submitVideoURL}>Set Video</button>
                    </div>
                </Modal>

                <Clients />
            </aside>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    isWebsocketConnected: state.websocket.isConnected
})

const connector = connect(mapStateToProps)
export default connector(SideBar)