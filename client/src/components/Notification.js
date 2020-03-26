import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Notification.module.css'
import { deleteNotification } from '../redux/actions/main'

class Notification extends Component {
    constructor() {
        super()
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
                <span className={styles.close} onClick={this.deleteNotification}>X</span>
                <p className={styles.title}>{this.props.notification.title}</p>
                <p>{this.props.notification.message}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.main.notification
})

const mapDispatchToProps = {
    deleteNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)