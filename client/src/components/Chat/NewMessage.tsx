import React, { Component } from 'react'

import styles from './NewMessage.module.css'

interface Props { }

interface State { }

class NewMessage extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.container}>
                <input className={styles.input} type="text" placeholder="Type your message ..." />
                <div className={styles.sendButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 0 24 24" width="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                </div>
            </div>
        )
    }
}

export default NewMessage