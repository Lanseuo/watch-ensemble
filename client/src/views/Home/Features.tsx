import React, { Component } from 'react'

import styles from './Features.module.css'

interface Props { }

interface State { }

class Features extends Component<Props, State> {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.feature}>
                    <div className={styles.smallArea}>
                        <div>
                            <h2>🧲 Synchronize video playback</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, beatae minus. Ex dignissimos tenetur corporis quo sapiente amet ab ratione!</p>
                        </div>
                    </div>
                    <div className={styles.largeArea}>
                        <img src="https://via.placeholder.com/350x200" alt="" />
                    </div>
                </div>

                <div className={`${styles.feature} ${styles.inverted}`}>
                    <div className={styles.smallArea}>
                        <div>
                            <h2>🌧️ Play videos from different kind of sources</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, beatae minus. Ex dignissimos tenetur corporis quo sapiente amet ab ratione!</p>
                        </div>
                    </div>
                    <div className={styles.largeArea}>
                        <img src="https://via.placeholder.com/350x200" alt="" />
                    </div>
                </div>

                <div className={styles.feature}>
                    <div className={styles.smallArea}>
                        <div>
                            <h2>💬 Integrated chat</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, beatae minus. Ex dignissimos tenetur corporis quo sapiente amet ab ratione!</p>
                        </div>
                    </div>
                    <div className={styles.largeArea}>
                        <img src="https://via.placeholder.com/350x200" alt="" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Features