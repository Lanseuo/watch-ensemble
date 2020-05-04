import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from "react-router-dom"
import PubSub from 'pubsub-js'

import styles from './SideBar.module.css'
import Modal from '../../components/Modal'
import Clients from './Clients'
import { AppState } from '../../redux/reducers'
import { requestVideo } from '../../redux/actions/video'
import { setShowChatWindow } from '../../redux/actions/chat'
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

    inputOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.submitVideoURL()
        }
    }

    toggleShowChatWindow = () => {
        this.props.setShowChatWindow(!this.props.chatShowWindow)
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

                <div className={styles.wrapper} onClick={this.toggleShowChatWindow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28px" height="28px"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                </div>

                <Modal title="Set Video" show={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                    <p>Paste the url of a video below to start watching. WatchEnsemble currently supports YouTube-, ARTE- and MP4-videos.</p>
                    <input className={styles.setVideoInput} autoFocus onKeyPress={this.inputOnKeyPress} value={this.state.videoURL} onChange={e => this.setState({ videoURL: e.target.value })} type="url" placeholder="https://www.arte.tv/fr/videos/012345-678-A/ma-vidéo" />
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
    isWebsocketConnected: state.websocket.isConnected,
    chatShowWindow: state.chat.showChatWindow
})

const mapDispatchToProps = {
    setShowChatWindow
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(SideBar)