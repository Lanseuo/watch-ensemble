import React, { Component } from 'react';
import Controls from './Controls'

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
                    <video style={styles.video}></video>
                    <Controls />
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
    },

    inner: {
        width: '100%'
    },

    video: {
        width: '100%'
    }
}

export default MainPart;