import React, { Component } from 'react'
import Video from './Video'
import Controls from './Controls'
import VideoDetails from './VideoDetails'

class MainPart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="main-part" style={styles.container}>
                <div style={styles.inner}>
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
    }
}

export default MainPart;