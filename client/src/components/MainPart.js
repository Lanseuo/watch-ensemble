import React, { Component } from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import screenfull from 'screenfull'

import styles from './MainPart.module.css'
import './MainPart.css'
import Video from './Video'
import Controls from './Controls'
import VideoDetails from './VideoDetails'
import ChooseLanguageModal from './ChooseLanguageModal'

class MainPart extends Component {
    constructor() {
        super()
        this.state = {
            showControlsInFullscreen: false
        }
    }

    componentDidMount() {
        let timer
        document.addEventListener('mousemove', () => {
            if (screenfull.isFullscreen) {
                this.setState({ showControlsInFullscreen: true })
                clearTimeout(timer)
                timer = setTimeout(() => {
                    this.setState({ showControlsInFullscreen: false })
                }, 750)
            }
        })
    }

    openSetVideoModal() {
        PubSub.publish('openSetVideoModal')
    }

    render() {
        let showControlsClassName = this.state.showControlsInFullscreen ? 'show-controls' : ''
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
                        <div className={`${styles.player} player ${showControlsClassName}`}>
                            <Video className={`styles.video`} />
                            <Controls className={styles.controls} />
                        </div>
                    )}
                    <ChooseLanguageModal />
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