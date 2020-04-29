import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

interface Props {
}

interface State {
}

class Header extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div>
                        <h2>Watch videos from ARTE, YouTube, and more together</h2>
                        <p>WatchEnsemble allows you to watch videos from different kind of sources with your friends online. WatchEnsemble runs directly in your browser and synchronizes video playback between you and your friends.</p>
                        <div className={styles.joinButtonWrapper}>
                            <Link className={styles.joinButton} to="/room">Join Room</Link>
                        </div>
                    </div>
                </div>

                <div>
                    <img className={styles.mockupImage} src="https://i.ya-webdesign.com/images/chrome-mockup-png-1.png" alt="Mockup" />
                </div>
            </div>
        )
    }
}

export default Header