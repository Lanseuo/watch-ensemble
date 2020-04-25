import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import styles from './Home.module.css'
import Logo from '../../logo.svg';

interface Props extends RouteComponentProps { }

interface State { }

class Home extends Component<Props, State> {
    render() {
        return (
            <div>
                <nav className={styles.nav}>
                    <div className={styles.navInner}>
                        <img className={styles.logo} src={Logo} alt="WatchEnsemble Logo" />
                    </div>
                    <div className="button-wrapper">
                        <button onClick={() => this.props.history.push('/room')}>Join Room</button>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Home)