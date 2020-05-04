import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import styles from './Chat.module.css'
import { AppState } from '../../redux/reducers'

import MessageList from './MessageList'
import NewMessage from './NewMessage'

interface Props extends ConnectedProps<typeof connector> { }

interface State {
    messages: { author: string, text: string, type: string }[]
}

class Chat extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            messages: [
                {
                    author: 'User 1',
                    text: 'Message 1',
                    type: 'received'
                },
                {
                    author: 'User 2',
                    text: 'Message 2',
                    type: 'received'
                },
                {
                    author: '',
                    text: 'Message 3',
                    type: 'sent'
                },
                {
                    author: 'User 3',
                    text: 'Message 4',
                    type: 'received'
                }
            ]
        }
    }

    render() {
        let showChat = true
        if (!showChat) return <div></div>

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Chat</h3>
                </div>
                <MessageList messages={this.state.messages} />
                <NewMessage />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(Chat)