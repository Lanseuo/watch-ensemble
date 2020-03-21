import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollapsableContainer from './CollapsableContainer'

class VideoDetails extends Component {
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

const mapStateToProps = state => ({
    language: state.video.language,
    videoDetails: state.video.details
})

export default connect(mapStateToProps)(VideoDetails)