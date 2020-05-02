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
    }

    componentWillUnmount() {
        this.containerRef.current!.removeEventListener('click', this.scrub)
    }

    scrub = (event: MouseEvent) => {
        const scrubTime = (event.offsetX / this.containerRef.current!.offsetWidth) * this.props.totalTime;
        this.props.update(scrubTime)
    }

    render() {
        let filledPercentage = this.props.currentTime / this.props.totalTime * 100 || 0

        return (
            <div className={styles.container} ref={this.containerRef}>
                <div className={styles.filled} style={{ width: `${filledPercentage}%` }}></div>
            </div>
        )
    }
}

export default ProgressBar