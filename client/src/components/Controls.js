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
                    this.handleButton()
                }
            }
        })
    }

    handleButton = () => {
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
        let buttonText = { paused: 'Play', playing: 'Pause', waiting: 'Waiting' }[this.props.videoPlaybackState]
        let sliderPercentage = this.props.videoCurrentTime / this.props.videoTotalTime || 0

        return (
            <div className={styles.container} style={{ visibility: visible ? 'visible' : 'hidden' }}>
                <button onClick={this.handleButton}>{buttonText}</button>
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