import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import PubSub from 'pubsub-js'

import styles from './MainPart.module.css'
import './MainPart.css'
import Video from './Video'
import YouTubeVideo from './YouTubeVideo'
import Controls from './Controls'
import VideoDetails from './VideoDetails'
import ChooseLanguageModal from './ChooseLanguageModal'
import { AppState } from '../../redux/reducers'

interface Props extends ConnectedProps<typeof connector> { }

interface State {
    mouseMovedRecently: boolean
}

class MainPart extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            mouseMovedRecently: false
        }
    }

    componentDidMount() {
        let timer: NodeJS.Timeout
        document.addEventListener('mousemove', () => {
            this.setState({ mouseMovedRecently: true })
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.setState({ mouseMovedRecently: false })
            }, 1000)
        })
    }

    openSetVideoModal() {
        PubSub.publish('openSetVideoModal', {})
    }

    handleVideoClick = () => {
        if (this.props.isTouchDevice) {
            this.setState({ mouseMovedRecently: true })
        }
    }

    render() {
        let mouseMovedRecentlyClassName = this.state.mouseMovedRecently ? `mouse-moved-recently` : ''
        let videoNotPlayingClassName = this.props.videoPlaybackState !== 'playing' ? 'video-not-playing' : ''

        return (
            <div className={styles.container}>
                <div className={styles.inner}>
                    {this.props.videoDetails === null && (
                        <div>
                            <p className={styles.selectInstructions}>Select a video to start watching</p>
                            <div className="button-wrapper">
                                <button onClick={this.openSetVideoModal}>Select New Video</button>
                            </div>
                        </div>
                    )}

                    {this.props.videoDetails !== null && (
                        <div className={`${styles.player} player ${mouseMovedRecentlyClassName} ${videoNotPlayingClassName}`}>
                            {this.props.videoDetails.source !== 'youtube' && (
                                <Video onClick={this.handleVideoClick} />
                            )}
                            {this.props.videoDetails.source === 'youtube' && (
                                <YouTubeVideo onClick={this.handleVideoClick} />
                            )}

                            <Controls className={styles.controls} />
                        </div>
                    )}
                    <ChooseLanguageModal />
                    <VideoDetails />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    isTouchDevice: state.main.isTouchDevice,
    videoDetails: state.video.details,
    videoPlaybackState: state.video.playbackState
})

const connector = connect(mapStateToProps)
export default connector(MainPart)