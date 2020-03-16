import React, { Component } from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'

import styles from './MainPart.module.css'
import './MainPart.css'
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
            <div className={styles.container}>
                <div className={styles.inner}>
                    {this.props.videoDetails === null && (
                        <div>
                            <p className={styles.selectInstructions}>Select a video to start watching</p>
                            <div className="button-wrapper">
                                <button onClick={this.openSetVideoModal}>Select New Video</button>
                            </div>
                        </div>
                    )}

                    {this.props.videoDetails !== null && (
                        <div className={`${styles.player} player`}>
                            <Video className={styles.video} />
                            <Controls className={styles.controls} />
                        </div>
                    )}
                    <VideoDetails />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    videoDetails: state.video.details
})

export default connect(mapStateToProps)(MainPart)