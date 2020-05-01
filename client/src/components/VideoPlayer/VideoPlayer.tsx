import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import styles from './VideoPlayer.module.css'
import './VideoPlayer.css'
import HTMLVideo from './HTMLVideo'
import YouTubeVideo from './YouTubeVideo'
import Controls from './Controls'
import { AppState } from '../../redux/reducers'

interface Props extends ConnectedProps<typeof connector> { }

interface State {
    mouseMovedRecently: boolean
}

class VideoPlayer extends Component<Props, State> {
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

    handleVideoClick = () => {
        if (this.props.isTouchDevice) {
            this.setState({ mouseMovedRecently: true })
        }
    }

    render() {
        let mouseMovedRecentlyClassName = this.state.mouseMovedRecently ? `mouse-moved-recently` : ''
        let videoNotPlayingClassName = this.props.videoPlaybackState !== 'playing' ? 'video-not-playing' : ''

        return (
            <div className={`${styles.player} player ${mouseMovedRecentlyClassName} ${videoNotPlayingClassName}`}>
                {this.props.videoDetails!.source !== 'youtube' && (
                    <HTMLVideo onClick={this.handleVideoClick} />
                )}
                {this.props.videoDetails!.source === 'youtube' && (
                    <YouTubeVideo onClick={this.handleVideoClick} />
                )}

                <Controls className={styles.controls} />
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
export default connector(VideoPlayer)