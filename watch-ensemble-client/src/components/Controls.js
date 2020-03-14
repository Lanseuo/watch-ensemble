import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPlaybackState, jumpToTime } from '../redux/actions/video'
import { formatTime } from '../utils'

class Controls extends Component {
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
        let visible = this.props.videoUrl !== null
        let buttonText = { paused: 'Play', playing: 'Pause', waiting: 'Waiting' }[this.props.videoPlaybackState]
        let sliderPercentage = this.props.videoCurrentTime / this.props.videoTotalTime || 0

        return (
            <div className="controls" style={{ ...styles.container, visibility: visible ? 'visible' : 'hidden' }}>
                <button onClick={this.handleButton}>{buttonText}</button>
                <p style={styles.time}>{formatTime(this.props.videoCurrentTime)}</p>
                <input style={styles.slider} onChange={this.handleSlider} type="range" min="1" max="1000" value={sliderPercentage * 1000} />
                <p style={styles.time}>{formatTime(this.props.videoTotalTime)}</p>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr auto',
        gridGap: 5,
        placeItems: 'center',
        padding: '0 5px'
    },

    time: {
        fontSize: '0.75em'
    }
}

const mapStateToProps = state => ({
    videoPlaybackState: state.video.playbackState,
    videoUrl: state.video.url,
    videoCurrentTime: state.video.currentTime,
    videoTotalTime: state.video.totalTime
})

const mapDispatchToProps = {
    setPlaybackState,
    jumpToTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)