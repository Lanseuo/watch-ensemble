import React, { Component } from 'react'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleClick() {
        this.props.onClose()
    }

    render() {
        if (!this.props.show) return null

        return (
            <div className="Modal" style={styles.container}>
                <div style={styles.wrapper}>
                    <div style={styles.modalContainer}>
                        <div style={styles.header}>
                            <span>{this.props.title}</span>
                            <span style={styles.close} onClick={this.handleClick.bind(this)}>
                                X
                            </span>
                        </div>

                        <div style={styles.body}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const styles = {
    container: {
        position: 'fixed',
        zIndex: 9998,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'table',
        transition: 'opacity 0.3s ease'
    },

    wrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',
    },

    modalContainer: {
        maxWidth: '750px',
        width: '95%',
        margin: '0px auto',
        border: '0.5px solid rgba(125, 125, 125, 0.15)',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.33)',
        transition: 'all 0.3s ease',
    },

    header: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        placeItems: 'center start',
        width: '100%',
        background: 'var(--primary-color)',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        color: 'white',
        padding: '10px 20px',
    },

    close: {
        cursor: 'pointer'
    },

    body: {
        background: 'var(--dark-background-color)',
        padding: '15px 20px',
        maxHeight: '80vh',
    }
}

export default Modal