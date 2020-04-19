import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import CollapsableContainer from './CollapsableContainer'
import { AppState } from '../redux/reducers'

interface Props extends ConnectedProps<typeof connector> { }

class VideoDetails extends Component<Props> {
    render() {
        if (this.props.videoDetails === null) {
            return null
        }

        return (
            <div>
                <CollapsableContainer title="Video Details">
                    <h3>{this.props.videoDetails.title[this.props.language]}</h3>
                    <p>{this.props.videoDetails.description[this.props.language]}</p>
                </CollapsableContainer>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    language: state.video.language,
    videoDetails: state.video.details
})

const connector = connect(mapStateToProps)
export default connector(VideoDetails)