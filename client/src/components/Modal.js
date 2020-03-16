import React, { Component } from 'react'

import styles from './Modal.module.css'

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', event => {
            let escape = 27

            if (event.keyCode === escape) {
                this.props.onClose()
            }
        })
    }

    handleClick() {
        this.props.onClose()
    }

    render() {
        if (!this.props.show) return null

        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.modalContainer}>
                        <div className={styles.header}>
                            <span>{this.props.title}</span>
                            <span className={styles.close} onClick={this.handleClick.bind(this)}>X</span>
                        </div>

                        <div className={styles.body}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Modal