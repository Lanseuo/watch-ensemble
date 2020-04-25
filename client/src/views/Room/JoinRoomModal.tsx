import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { setUserName } from '../../redux/actions/main'
import Modal from './Modal'

interface Props extends ConnectedProps<typeof connector> {
    didJoinRoom: boolean
    joined(): void
}

interface State {
    userName: string
}

class JoinRoomModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            userName: localStorage.getItem('userName') || ''
        }
    }

    joinRoom = () => {
        if (this.state.userName === '') return

        localStorage.setItem('userName', this.state.userName)

        this.props.setUserName(this.state.userName)
        this.props.joined()
    }

    inputOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

const connector = connect(null, mapDispatchToProps)
export default connector(JoinRoomModal)