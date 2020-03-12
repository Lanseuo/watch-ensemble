import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setPlaybackState } from '../redux/actions'

class Controls extends Component {
    constructor() {
        super()
        this.state = {
            visible: true,
            playing: false
        }
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
                console.log(this.props.videoPlaybackState);
        }
    }

    render() {
        let buttonText = { paused: 'Play', playing: 'Pause', waiting: 'Waiting' }[this.props.videoPlaybackState]

        return (
            <div className="controls" style={{ ...styles.container, visibility: this.state.visible ? 'visible' : 'hidden' }}>
                <button onClick={this.handleButton}>{buttonText}</button>
                <p style={styles.time}>00:00</p>
                <input style={styles.slider} type="range" min="1" max="1000" defaultValue="0" />
                <p style={styles.time}>00:00</p>
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
    videoPlaybackState: state.videoPlaybackState
})

const mapDispatchToProps = {
    setPlaybackState
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)