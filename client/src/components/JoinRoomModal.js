import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './ChooseLanguageModal.module.css'
import { setUserName } from '../redux/actions/main'
import Modal from './Modal'

class JoinRoomModal extends Component {
    constructor() {
        super()
        this.state = {
            userName: ''
        }
    }

    joinRoom = () => {
        if (this.state.userName === '') return

        this.props.setUserName(this.state.userName)
        this.props.joined()
    }

    inputOnKeyPress = event => {
        if (event.key === 'Enter') {
            this.joinRoom()
        }
    }

    render() {
        return (
            <Modal title="Join Room" show={!this.props.didJoinRoom} onClose={() => { }}>
                <div className="JoinRoomModal">
                    <div>
                        <input placeholder="Your Name" value={this.state.userName} autoFocus onKeyPress={this.inputOnKeyPress} onChange={e => { this.setState({ userName: e.target.value }) }} type="text" />
                        <div className="button-wrapper">
                            <button onClick={this.joinRoom} disabled={this.state.userName === ''}>Join Room</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = {
    setUserName
}

export default connect(null, mapDispatchToProps)(JoinRoomModal)