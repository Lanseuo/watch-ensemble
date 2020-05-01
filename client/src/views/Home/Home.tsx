import React, { Component } from 'react'

import Header from './Header'

import styles from './Home.module.css'
import Logo from '../../logo.svg'
import Features from './Features'

interface Props { }

interface State { }

class Home extends Component<Props, State> {
    render() {
        return (
            <div>
                <nav className={styles.nav}>
                    <div className={styles.navInner}>
                        <img className={styles.logo} src={Logo} alt="WatchEnsemble Logo" />
                        <h1>WatchEnsemble</h1>
                    </div>
                </nav>

                <main className={styles.main}>
                    <Header />
                </main>

                <div className={styles.divider} />

                <main className={styles.main}>
                    <Features />
                </main>
            </div>
        )
    }
}

export default Home