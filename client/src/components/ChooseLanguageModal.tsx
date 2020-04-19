import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import styles from './ChooseLanguageModal.module.css'
import { setShowLanguageModal } from '../redux/actions/main'
import { setLanguage } from '../redux/actions/video'
import { Language } from '../redux/types/video'
import { AppState } from '../redux/reducers'
import Modal from './Modal'

interface Props extends ConnectedProps<typeof connector> { }

class ChooseLanguage extends Component<Props> {
    handleClick = (language: Language) => {
        this.props.setShowLanguageModal(false)
        this.props.setLanguage(language)
    }

    getStyle = (language: Language) => {
        if (this.props.videoDetails === null) {
            return ''
        } else if (this.props.language === language) {
            return styles.active
        } else if (!this.props.videoDetails.languages.includes(language)) {
            return styles.hide
        }
        return ''
    }

    render() {
        return (
            <Modal title="Choose Language" show={this.props.showLanguageModal} onClose={() => this.props.setShowLanguageModal(false)}>
                <div className={styles.container}>

                    <svg onClick={this.handleClick.bind(this, 'fr')} className={this.getStyle('fr')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
                        <desc>Flag of France</desc>
                        <rect width="1" height="3" y="0" x="0" fill="#ED2939" />
                        <rect width="2" height="3" y="0" x="1" fill="#fff" />
                        <rect width="3" height="3" y="0" x="2" fill="#002395" />
                    </svg>

                    <svg onClick={this.handleClick.bind(this, 'de')} className={this.getStyle('de')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
                        <desc>Flag of Germany</desc>
                        <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000" />
                        <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00" />
                        <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00" />
                    </svg>
                </div >
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    language: state.video.language,
    videoDetails: state.video.details,
    showLanguageModal: state.main.showLanguageModal,
})

const mapDispatchToProps = {
    setLanguage,
    setShowLanguageModal
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(ChooseLanguage)