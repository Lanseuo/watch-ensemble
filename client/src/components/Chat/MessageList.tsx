import React, { Component } from 'react'

import styles from './MessageList.module.css'

interface Props {
    messages: { author: string, text: string, type: string }[]
}

interface State { }

class MessageList extends Component<Props, State> {
    render() {
        return (
            <div className={styles.container}>
                {this.props.messages.map((message, index) => (
                    <div className={`${styles.message} ${message.type === 'received' ? styles.received : styles.sent}`} key={index}>
                        {message.type === 'received' && <p className={styles.author}>{message.author}</p>}
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default MessageList