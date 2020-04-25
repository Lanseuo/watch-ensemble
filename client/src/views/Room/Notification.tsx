import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import styles from './Notification.module.css'
import { deleteNotification } from '../../redux/actions/main'
import { AppState } from '../../redux/reducers'

interface Props extends ConnectedProps<typeof connector> { }

interface State {
    userName: string
}

class Notification extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            userName: ''
        }
    }

    render() {
        if (this.props.notification === null) return null

        let typeClassName
        switch (this.props.notification.type) {
            case 'info':
                typeClassName = styles.infoType
                break
            case 'success':
                typeClassName = styles.successType
                break
            case 'error':
                typeClassName = styles.errorType
                break
        }

        return (
            <div className={`${styles.container} ${typeClassName}`}>
                <span className={styles.close} onClick={this.props.deleteNotification}>X</span>
                <p className={styles.title}>{this.props.notification.title}</p>
                <p>{this.props.notification.message}</p>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    notification: state.main.notification
})

const mapDispatchToProps = {
    deleteNotification
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(Notification)