import React, { Component } from 'react'
import { connect } from 'react-redux'

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.videoRef = React.createRef()
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.videoPlaybackState !== this.props.videoPlaybackState) {
            switch (nextProps.videoPlaybackState) {
                case 'playing':
                    this.videoRef.current.play()
                    break
                case 'paused':
                    this.videoRef.current.pause()
                    break
            }
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
    videoPlaybackState: state.videoPlaybackState,
    videoUrl: state.videoUrl
})

export default connect(mapStateToProps)(Video)