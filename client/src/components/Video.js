import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePlay, setPlaybackState, setPlaybackStateWithoutMessage, setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'
import { setNotification } from '../redux/actions/main'

class Video extends Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef()
    }

    componentDidMount() {
        this.videoRef.current.addEventListener('timeupdate', this.timeUpdate)
        this.videoRef.current.addEventListener('durationchange', this.durationChange)

        this.handlePlaybackState(this.props.videoPlaybackState)
        this.videoRef.current.currentTime = this.props.videoJumpToTimeLastUpdate
    }

    componentWillUnmount() {
        this.videoRef.current.removeEventListener('timeupdate', this.timeUpdate)
        this.videoRef.current.removeEventListener('durationchange', this.durationChange)
    }

    handleClick = () => {
        this.props.onClick()
        if (!this.props.isTouchDevice) {
            this.props.togglePlay()
        }
    }

    timeUpdate = () => {
        this.props.setVideoCurrentTime(this.videoRef.current.currentTime)
    }

    durationChange = () => {
        this.props.setVideoTotalTime(this.videoRef.current.duration)
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.language !== this.props.language) {
            let previousPlaybackState = this.props.videoPlaybackState
            let previousCurrentTime = this.videoRef.current.currentTime
            setTimeout(() => {
                this.handlePlaybackState(previousPlaybackState)
                this.videoRef.current.currentTime = previousCurrentTime
            }, 500)
        }

        if (nextProps.videoPlaybackState !== this.props.videoPlaybackState) {
            this.handlePlaybackState(nextProps.videoPlaybackState)
        }

        if (nextProps.videoJumpToTimeLastUpdate !== this.props.videoJumpToTimeLastUpdate) {
            this.videoRef.current.currentTime = nextProps.videoJumpToTimeLastUpdate
        }
    }

    handlePlaybackState(state) {
        switch (state) {
            case 'playing':
                this.videoRef.current.play().catch(this.handlePlaybackError)
                break
            case 'paused':
            case 'waiting':
                this.videoRef.current.pause()
                break
            default:
                console.error('Playback state of unknown type', state)
        }
    }

    handlePlaybackError = error => {
        // Safari doesn't allow autoplay
        let isAutoplayNotAllowedError = `${error}`.includes('NotAllowedError: The request is not allowed by the user agent or the platform')
        if (isAutoplayNotAllowedError) {
            this.props.setNotification('error', 'Can\'t autostart video', 'Please start video using play button or allow autoplay of videos in the Safari settings')
        }
        this.props.setPlaybackStateWithoutMessage('paused')
    }

    render() {
        let videoUrl = this.props.videoDetails ? this.props.videoDetails.url[this.props.language] : ''
        return (
            <video className="video" onClick={this.handleClick} style={styles.video} src={videoUrl} ref={this.videoRef}></video>
        )
    }
}

const styles = {
    video: {
        width: '100%'
    }
}

const mapStateToProps = state => ({
    isTouchDevice: state.main.isTouchDevice,
    language: state.video.language,
    videoPlaybackState: state.video.playbackState,
    videoDetails: state.video.details,
    videoJumpToTimeLastUpdate: state.video.jumpToTimeLastUpdate
})

const mapDispatchToProps = {
    togglePlay,
    setPlaybackState,
    setPlaybackStateWithoutMessage,
    setVideoCurrentTime,
    setVideoTotalTime,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)