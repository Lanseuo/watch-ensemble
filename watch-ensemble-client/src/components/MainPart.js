import React, { Component } from 'react';
import Controls from './Controls'
import Video from './Video'

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
    }
}

export default MainPart;