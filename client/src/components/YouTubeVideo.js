import React, { Component } from 'react'
import { connect } from 'react-redux'
import YTPlayer from 'yt-player'

import { togglePlay, setPlaybackState, setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'

class YouTubeVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: null
        }
    }

    componentDidMount() {
        const player = new YTPlayer('#youtube-video', {
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

    componentWillReceiveProps = nextProps => {
        if (nextProps.videoDetails.url !== this.props.videoDetails.url) {
            let url = nextProps.videoDetails.url.undefined
            this.state.player.load(url)
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
            <div id="youtube-video" style={styles.video}></div>
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
    setVideoCurrentTime,
    setVideoTotalTime
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo)