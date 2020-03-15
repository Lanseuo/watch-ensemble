import React, { Component } from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import Video from './Video'
import Controls from './Controls'
import VideoDetails from './VideoDetails'

class MainPart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    openSetVideoModal() {
        PubSub.publish('openSetVideoModal')
    }

    render() {
        return (
            <div className="main-part" style={styles.container}>
                <div style={styles.inner}>
                    {this.props.videoDetails === null && (
                        <div>
                            <p style={styles.selectInstructions}>Select a video to start watching</p>
                            <div className="button-wrapper">
                                <button onClick={this.openSetVideoModal}>Select New Video</button>
                            </div>
                        </div>
                    )}
                    <Video />
                    <Controls />
                    <VideoDetails />
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        margin: '50px 0',
        display: 'grid',
        placeItems: 'center'
    },

    inner: {
        margin: '0 auto',
        width: '50%'
    },

    selectInstructions: {
        textAlign: 'center'
    }
}

const mapStateToProps = state => ({
    videoDetails: state.video.details
})

export default connect(mapStateToProps)(MainPart)