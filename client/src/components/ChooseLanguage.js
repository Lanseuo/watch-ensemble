import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './ChooseLanguage.module.css'
import { setLanguage } from '../redux/actions/video'

class ChooseLanguage extends Component {
    handleClick = language => {
        this.props.setLanguage(language)
    }

    render() {
        let frenchStyle = this.props.language === 'fr' ? styles.active : {}
        let germanStyle = this.props.language === 'de' ? styles.active : {}

        return (
            <div className={styles.container}>
                <svg onClick={this.handleClick.bind(this, 'fr')} className={frenchStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
                    <desc>Flag of France</desc>
                    <rect width="1" height="3" y="0" x="0" fill="#ED2939" />
                    <rect width="2" height="3" y="0" x="1" fill="#fff" />
                    <rect width="3" height="3" y="0" x="2" fill="#002395" />
                </svg>

                <svg onClick={this.handleClick.bind(this, 'de')} className={germanStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
                    <desc>Flag of Germany</desc>
                    <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000" />
                    <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00" />
                    <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00" />
                </svg>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    language: state.video.language
})

const mapDispatchToProps = {
    setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage)