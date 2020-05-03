import React, { Component } from 'react'

import styles from './ProgressBar.module.css'

interface Props {
    currentTime: number
    bufferTime: number
    totalTime: number
    update: (seconds: number) => void
}

interface State { }

class ProgressBar extends Component<Props, State> {
    containerRef = React.createRef<HTMLDivElement>()

    componentDidMount() {
        this.containerRef.current!.addEventListener('click', this.scrub)
        this.containerRef.current!.addEventListener('mousemove', this.scrubOnMousemove)
    }

    componentWillUnmount() {
        this.containerRef.current!.removeEventListener('click', this.scrub)
        this.containerRef.current!.removeEventListener('mousemove', this.scrubOnMousemove)
    }

    scrub = (event: MouseEvent) => {
        const scrubTime = (event.offsetX / this.containerRef.current!.offsetWidth) * this.props.totalTime;
        this.props.update(scrubTime)
    }

    scrubOnMousemove = (event: MouseEvent) => {
        // If mousedown
        if (event.buttons === 1) {
            this.scrub(event)
        }
    }

    render() {
        let bufferPercentage = this.props.bufferTime / this.props.totalTime * 100 || 0
        let currentPercentage = this.props.currentTime / this.props.totalTime * 100 || 0

        return (
            <div className={styles.container} ref={this.containerRef}>
                <div className={`${styles.filled} ${styles.buffer}`} style={{ width: `${bufferPercentage}%` }}></div>
                <div className={`${styles.filled} ${styles.current}`} style={{ width: `${currentPercentage}%` }}></div>
            </div>
        )
    }
}

export default ProgressBar