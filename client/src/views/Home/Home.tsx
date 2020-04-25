import React, { Component } from 'react'

import Header from './Header'

import styles from './Home.module.css'
import Logo from '../../logo.svg';

interface Props { }

interface State { }

class Home extends Component<Props, State> {
    render() {
        return (
            <div>
                <nav className={styles.nav}>
                    <div className={styles.navInner}>
                        <img className={styles.logo} src={Logo} alt="WatchEnsemble Logo" />
                    </div>
                </nav>

                <main className={styles.main}>
                    <Header />
                </main>
            </div>
        )
    }
}

export default Home