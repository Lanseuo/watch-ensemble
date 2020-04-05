import React, { Component } from 'react'
import { connect } from 'react-redux'
import YTPlayer from 'yt-player'

import styles from './YouTubeVideo.module.css'
import { togglePlay, setPlaybackState, setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'

class YouTubeVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elementHeight: 0
        }

        this.player = null
        this.videoWrapperRef = React.createRef()
    }

    componentDidMount() {
        this.player = new YTPlayer('#youtube-video', {
            autoplay: false,
            height: '100%',
            controls: false,
            keyboard: false,
            related: false,
            modestBranding: true,
            showinfo: false
        })

        let url = this.props.videoDetails.url.undefined
        if (url) {
            this.setVideoByURL(url)
        }

        this.player.on('cued', () => {
            this.handlePlaybackState(this.props.videoPlaybackState)
        })

        this.player.on('timeupdate', this.timeUpdate)

        this.setAspectRatio(this.props.videoDetails)
        window.addEventListener('resize', this.setAspectRatio.bind(this, null))
    }

    handleClick = () => {
        this.props.onClick()
        if (!this.props.isTouchDevice) {
            this.props.togglePlay()
        }
    }

    setVideoByURL = url => {
        this.player.load({
            videoId: url,
            startSeconds: this.props.videoJumpToTimeLastUpdate
        })
    }

    timeUpdate = seconds => {
        this.props.setVideoCurrentTime(seconds)
        this.props.setVideoTotalTime(this.player.getDuration())
    }

    setAspectRatio = videoDetails => {
        if (!videoDetails) {
            videoDetails = this.props.videoDetails
        }

        let elementWidth = this.videoWrapperRef.current.offsetWidth
        let videoAspectRatio = videoDetails.aspectRatioWidth / videoDetails.aspectRatioHeight
        let elementHeight = elementWidth / videoAspectRatio
        this.setState({ elementHeight })
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.videoDetails !== this.props.videoDetails) {
            this.setVideoByURL(nextProps.videoDetails.url.undefined)

            this.setAspectRatio(nextProps.videoDetails)
        }

        if (nextProps.videoPlaybackState !== this.props.videoPlaybackState) {
            this.handlePlaybackState(nextProps.videoPlaybackState)
        }

        if (nextProps.videoJumpToTimeLastUpdate !== this.props.videoJumpToTimeLastUpdate) {
            this.player.seek(nextProps.videoJumpToTimeLastUpdate)
        }
    }

    handlePlaybackState(state) {
        switch (state) {
            case 'playing':
                this.player.play()
                break
            case 'paused':
            case 'waiting':
                this.player.pause()
                break
            default:
                console.error('Playback state of unknown type', state)
        }
    }

    render() {
        return (
            <div className={styles.container} ref={this.videoWrapperRef} style={{ height: this.state.elementHeight }}>
                <div id="youtube-video" className={styles.video}></div>
                <div className={styles.overlapIframe} onClick={this.handleClick}></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isTouchDevice: state.main.isTouchDevice,
    language: state.video.language,
    videoPlaybackState: state.video.playbackState,
    videoDetails: state.video.details,
    videoJumpToTimeLastUpdate: state.video.jumpToTimeLastUpdate,
    videoCurrentTime: state.video.currentTime
})

const mapDispatchToProps = {
    togglePlay,
    setPlaybackState,
    setVideoCurrentTime,
    setVideoTotalTime
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo)