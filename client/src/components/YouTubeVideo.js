import React, { Component } from 'react'
import { connect } from 'react-redux'
import YTPlayer from 'yt-player'

import { togglePlay, setPlaybackState, setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'

class YouTubeVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: null,
            elementHeight: 0
        }

        this.videoWrapperRef = React.createRef()
    }

    componentDidMount() {
        const player = new YTPlayer('#youtube-video', {
            height: '100%',
            controls: false,
            keyboard: false,
            related: false,
            modestBranding: true,
            showinfo: false
        })
        this.setState({ player })

        let url = this.props.videoDetails.url.undefined
        if (url) {
            player.load(url)
        }

        player.on('timeupdate', this.timeUpdate)

        this.setAspectRatio(this.props.videoDetails)
        window.addEventListener('resize', this.setAspectRatio.bind(this, null))
    }

    handleClick = () => {
        this.props.onClick()
        if (!this.props.isTouchDevice) {
            this.props.togglePlay()
        }
    }

    timeUpdate = seconds => {
        this.props.setVideoCurrentTime(seconds)
        this.props.setVideoTotalTime(this.state.player.getDuration())
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
            let url = nextProps.videoDetails.url.undefined
            this.state.player.load(url)

            this.setAspectRatio(nextProps.videoDetails)
        }

        if (nextProps.videoPlaybackState !== this.props.videoPlaybackState) {
            this.handlePlaybackState(nextProps.videoPlaybackState)
        }

        if (nextProps.videoJumpToTimeLastUpdate !== this.props.videoJumpToTimeLastUpdate) {
            this.state.player.seek(nextProps.videoJumpToTimeLastUpdate)
        }
    }

    handlePlaybackState(state) {
        switch (state) {
            case 'playing':
                this.state.player.play()
                break
            case 'paused':
            case 'waiting':
                this.state.player.pause()
                break
            default:
                console.error('Playback state of unknown type', state)
        }
    }

    render() {
        return (
            <div className="youtube-video-wrapper" ref={this.videoWrapperRef} style={{ ...styles.container, height: this.state.elementHeight }}>
                <div id="youtube-video" style={styles.video}></div>
                <div style={styles.overlapIframe} onClick={this.handleClick}></div>
            </div>
        )
    }
}

const styles = {
    container: {
        position: 'relative'
    },

    video: {
        width: '100%'
    },

    // Make iframe unclickable
    overlapIframe: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0
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
    setVideoCurrentTime,
    setVideoTotalTime
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo)