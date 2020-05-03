import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import styles from './Clients.module.css'
import { AppState } from '../../redux/reducers'

interface Props extends ConnectedProps<typeof connector> { }

class Clients extends Component<Props> {
    getFirstLetter(name: string) {
        return name.charAt(0).toUpperCase()
    }

    getRandomColor() {
        let colors = ['#1565c0', '#ff1744', '#388e3c', '#9c27b0', '#4dd0e1', '#ffc107', '#f4511e', '#afb42b', '#0091ea', '#827717']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    render() {
        return (
            <div className={styles.container}>
                <p>Clients</p>
                {this.props.clients.map((client, index) => (
                    <div className={styles.client} key={index}>
                        <div className={styles.clientInner} style={{ background: this.getRandomColor() }}>
                            <p>
                                {this.getFirstLetter(client)}
                                <span className={styles.tooltip}>{client}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    clients: state.main.clients
})

const connector = connect(mapStateToProps)
export default connector(Clients)