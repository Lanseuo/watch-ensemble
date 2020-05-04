import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import styles from './Chat.module.css'
import { AppState } from '../../redux/reducers'
import { sendMessage } from '../../redux/actions/chat'

import MessageList from './MessageList'
import NewMessage from './NewMessage'

interface Props extends ConnectedProps<typeof connector> { }

interface State { }

class Chat extends Component<Props, State> {
    render() {
        if (!this.props.showWindow) return <div></div>

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Chat</h3>
                </div>
                <MessageList messages={this.props.messages} />
                <NewMessage send={this.props.sendMessage} />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    showWindow: state.chat.showChatWindow,
    messages: state.chat.messages
})

const mapDispatchToProps = {
    sendMessage
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(Chat)