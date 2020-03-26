import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Clients.module.css'

class Clients extends Component {
    getFirstLetter = name => {
        return name.charAt(0)
    }

    render() {
        return (
            <div className={styles.container}>
                <p>Clients</p>
                {this.props.clients.map((client, index) => (
                    <div className={styles.client} key={index}>
                        <div className={styles.clientInner}>
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

const mapStateToProps = state => ({
    clients: state.main.clients
})

export default connect(mapStateToProps)(Clients)