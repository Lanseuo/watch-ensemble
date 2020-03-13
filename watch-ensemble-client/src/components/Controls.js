import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setPlaybackState, jumpToTime } from '../redux/actions'
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
                console.log(this.props.videoPlaybackState);
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
        let sliderPercentage = this.props.videoCurrentTime / this.props.videoTotalTime

        return (
            <div className="controls" style={{ ...styles.container, visibility: visible ? 'visible' : 'hidden' }}>
                <button onClick={this.handleButton}>{buttonText}</button>
                <p style={styles.time}>{formatTime(this.props.videoCurrentTime)}</p>
                <input style={styles.slider} onInput={this.handleSlider} type="range" min="1" max="1000" value={sliderPercentage * 1000} />
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
    },

    slider: {
        appearance: null,
        width: '100%',
        height: 5,
        background: 'white',
        opacity: 0.7,
        transition: 'opacity .2s'
    }

    // .slider:hover {
    //     opacity: 1;
    // }

    // .slider::-webkit-slider-thumb, .slider::-moz-range-thumb {
    //     -webkit-appearance: none;
    //     appearance: none;
    //     width: 10px;
    //     height: 10px;
    //     background: #ff9f1c;
    //     cursor: pointer;
    // }
}

const mapStateToProps = state => ({
    videoPlaybackState: state.videoPlaybackState,
    videoUrl: state.videoUrl,
    videoCurrentTime: state.videoCurrentTime,
    videoTotalTime: state.videoTotalTime
})

const mapDispatchToProps = {
    setPlaybackState,
    jumpToTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)