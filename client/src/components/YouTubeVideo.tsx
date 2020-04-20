import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import YTPlayer from 'yt-player'

import styles from './YouTubeVideo.module.css'
import { togglePlay, setPlaybackState, setPlaybackStateWithoutMessage, setVideoCurrentTime, setVideoTotalTime } from '../redux/actions/video'
import { PlaybackState, VideoDetails } from '../redux/types/video'
import { AppState } from '../redux/reducers'

interface Props extends ConnectedProps<typeof connector> {
    onClick(): void
}

interface State {
    elementHeight: number
}

class YouTubeVideo extends Component<Props, State> {
    player: YTPlayer | null = null
    videoWrapperRef = React.createRef<HTMLDivElement>()

    constructor(props: Props) {
        super(props)

        this.state = {
            elementHeight: 0
        }
    }

    componentDidMount() {
        this.player = new YTPlayer('#youtube-video', {
            autoplay: false,
            // @ts-ignore
            height: '100%',
            controls: false,
            keyboard: false,
            related: false,
            modestBranding: true,
            // @ts-ignore
            showinfo: false
        })

        let url = this.props.videoDetails!.url.undefined
        if (url) {
            this.setVideoByURL(url)
        }

        this.player!.on('cued', () => {
            this.handlePlaybackState(this.props.videoPlaybackState)
        })

        this.player!.addListener('timeupdate', this.onTimeUpdate)
        this.player!.addListener('ended', this.onEnded)

        this.setAspectRatio(this.props.videoDetails!)
        window.addEventListener('resize', this.setAspectRatioFromProps)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setAspectRatioFromProps)
        this.player!.removeListener('timeupdate', this.onTimeUpdate)
        this.player!.removeListener('ended', this.onEnded)
    }

    handleClick = () => {
        this.props.onClick()
        if (!this.props.isTouchDevice) {
            this.props.togglePlay()
        }
    }

    setVideoByURL = (url: string) => {
        // YTPlayer expects to be called without startSeconds
        const p = this.player as any
        p.load({
            videoId: url,
            startSeconds: this.props.videoJumpToTimeLastUpdate
        })
    }

    onTimeUpdate = (seconds: number) => {
        this.props.setVideoCurrentTime(seconds)
        this.props.setVideoTotalTime(this.player!.getDuration())
    }

    onEnded = () => {
        this.props.setPlaybackStateWithoutMessage('paused')
        this.player!.seek(0)
    }

    setAspectRatioFromProps = () => {
        this.setAspectRatio(this.props.videoDetails!)
    }

    setAspectRatio = (videoDetails: VideoDetails) => {
        let elementWidth = this.videoWrapperRef.current!.offsetWidth
        let videoAspectRatio = videoDetails.aspectRatioWidth / videoDetails.aspectRatioHeight
        let elementHeight = elementWidth / videoAspectRatio
        this.setState({ elementHeight })
    }

    componentWillReceiveProps = (nextProps: Props) => {
        if (nextProps.videoDetails !== this.props.videoDetails) {
            this.setVideoByURL(nextProps.videoDetails!.url.undefined)

            this.setAspectRatio(nextProps.videoDetails!)
        }

        if (nextProps.videoPlaybackState !== this.props.videoPlaybackState) {
            this.handlePlaybackState(nextProps.videoPlaybackState)
        }

        if (nextProps.videoJumpToTimeLastUpdate !== this.props.videoJumpToTimeLastUpdate) {
            this.player!.seek(nextProps.videoJumpToTimeLastUpdate)
        }
    }

    handlePlaybackState(state: PlaybackState) {
        switch (state) {
            case 'playing':
                this.player!.play()
                break
            case 'paused':
            case 'waiting':
                this.player!.pause()
                break
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

const mapStateToProps = (state: AppState) => ({
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
    setPlaybackStateWithoutMessage,
    setVideoCurrentTime,
    setVideoTotalTime
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(YouTubeVideo)