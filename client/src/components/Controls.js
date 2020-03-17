import React, { Component } from 'react'
import { connect } from 'react-redux'
import screenfull from 'screenfull'

import styles from './Controls.module.css'
import { setPlaybackState, jumpToTime } from '../redux/actions/video'
import { formatTime } from '../utils'

class Controls extends Component {
    constructor() {
        super()
        this.state = {
            isFullscreen: screenfull.isFullscreen
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', e => {
            let letterK = 75
            let letterF = 70

            if (this.props.videoDetails === null) {
                return
            }

            let event = document.all ? window.event : e
            if (!/^(?:input|textarea|select|button)$/i.test(e.target.tagName)) {
                if (event.keyCode === letterK) {
                    this.togglePlay()
                } else if (event.keyCode === letterF) {
                    screenfull.toggle()
                }
            }
        })

        screenfull.on('change', this.handleFullscreenChange)
    }

    handleFullscreenChange = () => {
        let bodyElement = document.querySelector('body')

        if (screenfull.isFullscreen) {
            bodyElement.classList.add('fullscreen')
        } else {
            bodyElement.classList.remove('fullscreen')
        }

        this.setState({ isFullscreen: screenfull.isFullscreen })
    }

    toggleFullscreen = () => {
        screenfull.toggle()
    }

    togglePlay = () => {
        switch (this.props.videoPlaybackState) {
            case 'playing':
                this.props.setPlaybackState('paused')
                break
            case 'paused':
                this.props.setPlaybackState('playing')
                break
            default:
                console.error(this.props.videoPlaybackState)
        }
    }

    handleSlider = event => {
        let percentage = event.target.value / 1000
        let seconds = parseInt(percentage * this.props.videoTotalTime)
        this.props.jumpToTime(seconds)
    }

    render() {
        let visible = this.props.videoDetails !== null
        let icon = {
            paused: <svg onClick={this.togglePlay} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M8 5v14l11-7z" /><path d="M0 0h24v24H0z" fill="none" /></svg>,
            playing: <svg onClick={this.togglePlay} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /><path d="M0 0h24v24H0z" fill="none" /></svg>,
            waiting: <svg onClick={this.togglePlay} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M0 0h24v24H0z" fill="none" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
        }[this.props.videoPlaybackState]
        let sliderPercentage = this.props.videoCurrentTime / this.props.videoTotalTime || 0

        return (
            <div className={`${styles.container} controls`} style={{ visibility: visible ? 'visible' : 'hidden' }}>
                {icon}
                <p className={styles.time}>{formatTime(this.props.videoCurrentTime)}</p>
                <input className={styles.slider} onChange={this.handleSlider} type="range" min="1" max="1000" value={sliderPercentage * 1000} />
                <p className={styles.time}>{formatTime(this.props.videoTotalTime)}</p>
                {this.state.isFullscreen && (
                    <svg onClick={this.toggleFullscreen} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
                )}
                {!this.state.isFullscreen && (
                    <svg onClick={this.toggleFullscreen} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    videoDetails: state.video.details,
    videoPlaybackState: state.video.playbackState,
    videoCurrentTime: state.video.currentTime,
    videoTotalTime: state.video.totalTime
})

const mapDispatchToProps = {
    setPlaybackState,
    jumpToTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)