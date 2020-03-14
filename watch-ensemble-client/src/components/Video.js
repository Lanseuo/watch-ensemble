import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'

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
        if (nextProps.videoPlaybackState !== this.props.videoPlaybackState) {
            switch (nextProps.videoPlaybackState) {
                case 'playing':
                    this.videoRef.current.play()
                    break
                case 'paused':
                case 'waiting':
                    this.videoRef.current.pause()
                    break
                default:
                    console.error('Playback state of unknown type', nextProps.videoPlaybackState)
            }
        }

        if (nextProps.videoJumpToTimeLastUpdate !== this.props.videoJumpToTimeLastUpdate) {
            this.videoRef.current.currentTime = nextProps.videoJumpToTimeLastUpdate
        }
    }

    render() {
        return (
            <video className="video" style={styles.video} src={this.props.videoUrl} ref={this.videoRef}></video>
        )
    }
}

const styles = {
    video: {
        width: '100%'
    }
}

const mapStateToProps = state => ({
    videoPlaybackState: state.video.playbackState,
    videoUrl: state.video.url,
    videoJumpToTimeLastUpdate: state.video.jumpToTimeLastUpdate
})

const mapDispatchToProps = {
    setVideoCurrentTime,
    setVideoTotalTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)