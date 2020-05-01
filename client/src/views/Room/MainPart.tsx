import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import PubSub from 'pubsub-js'

import styles from './MainPart.module.css'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import VideoDetails from './VideoDetails'
import ChooseLanguageModal from '../../components/VideoPlayer/ChooseLanguageModal'
import { AppState } from '../../redux/reducers'

interface Props extends ConnectedProps<typeof connector> { }

interface State { }

class MainPart extends Component<Props, State> {
    openSetVideoModal() {
        PubSub.publish('openSetVideoModal', {})
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
                        <VideoPlayer />
                    )}
                    <ChooseLanguageModal />
                    <VideoDetails />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    videoDetails: state.video.details
})

const connector = connect(mapStateToProps)
export default connector(MainPart)