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
                        <h2>WatchEnsemble</h2>
                        <h3>Watch videos from ARTE, YouTube, and more together with friends</h3>
                        <div className="button-wrapper right">
                            <Link className="button" to="/room">Join Room</Link>
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