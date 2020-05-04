import React, { Component } from 'react'

import styles from './NewMessage.module.css'

interface Props {
    send: (messageText: string) => void
}

interface State {
    messageText: string
}

class NewMessage extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            messageText: ''
        }
    }

    inputOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.sendMessage()
        }
    }

    sendMessage = () => {
        if (this.state.messageText === '') return
        this.props.send(this.state.messageText)
        this.setState({ messageText: '' })
    }

    render() {
        return (
            <div className={styles.container}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Type your message ..."
                    onChange={e => { this.setState({ messageText: e.target.value }) }}
                    value={this.state.messageText}
                    onKeyPress={this.inputOnKeyPress}
                />
                <div className={styles.sendButton} onClick={this.sendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 0 24 24" width="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                </div>
            </div>
        )
    }
}

export default NewMessage