import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPlaybackState, setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'

class Video extends Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef()
    }

    componentDidMount() {
        this.videoRef.current.addEventListener('timeupdate', this.timeUpdate)
        this.videoRef.current.addEventListener('durationchange', this.durationChange)
    }

    timeUpdate = () => {
        this.props.setVideoCurrentTime(this.videoRef.current.currentTime)
    }

    durationChange = () => {
        this.props.setVideoTotalTime(this.videoRef.current.duration)
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.language != this.props.language) {
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
                this.videoRef.current.play()
                break
            case 'paused':
            case 'waiting':
                this.videoRef.current.pause()
                break
            default:
                console.error('Playback state of unknown type', state)
        }
    }

    render() {
        let videoUrl = this.props.videoDetails ? this.props.videoDetails.url[this.props.language] : ''
        return (
            <video className="video" style={styles.video} src={videoUrl} ref={this.videoRef}></video>
        )
    }
}

const styles = {
    video: {
        width: '100%'
    }
}

const mapStateToProps = state => ({
    language: state.video.language,
    videoPlaybackState: state.video.playbackState,
    videoDetails: state.video.details,
    videoJumpToTimeLastUpdate: state.video.jumpToTimeLastUpdate
})

const mapDispatchToProps = {
    setPlaybackState,
    setVideoCurrentTime,
    setVideoTotalTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)