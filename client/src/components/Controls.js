import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Controls.module.css'
import { setPlaybackState, jumpToTime } from '../redux/actions/video'
import { formatTime } from '../utils'

class Controls extends Component {
    componentDidMount() {
        document.addEventListener('keydown', e => {
            let letterK = 75

            if (this.props.videoDetails === null) {
                return
            }

            let event = document.all ? window.event : e
            if (!/^(?:input|textarea|select|button)$/i.test(e.target.tagName)) {
                if (event.keyCode === letterK) {
                    this.togglePlay()
                }
            }
        })
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