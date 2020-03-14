import React, { Component } from 'react'
import { connect } from 'react-redux'

import ChooseLanguage from './ChooseLanguage'

class VideoDetails extends Component {
    render() {
        console.log(this.props);
        if (this.props.videoDetails === null) {
            return null
        }

        return (
            <div className="VideoDetails" style={styles.container}>
                <h3>{this.props.videoDetails.title[this.props.language]}</h3>
                <p>{this.props.videoDetails.description[this.props.language]}</p>
                <ChooseLanguage />
            </div>
        )
    }
}

const styles = {
    container: {

    }
}

const mapStateToProps = state => ({
    language: state.video.language,
    videoDetails: state.video.details
})

export default connect(mapStateToProps)(VideoDetails)