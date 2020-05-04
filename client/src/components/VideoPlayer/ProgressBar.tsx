import React, { Component } from 'react'

import styles from './ProgressBar.module.css'
import { formatTime } from '../../utils'

interface Props {
    currentTime: number
    bufferTime: number
    totalTime: number
    update: (seconds: number) => void
}

interface State {
    mousePositionPercentage: number
}

class ProgressBar extends Component<Props, State> {
    containerRef = React.createRef<HTMLDivElement>()

    constructor(props: Props) {
        super(props)

        this.state = {
            mousePositionPercentage: 0
        }
    }

    componentDidMount() {
        this.containerRef.current!.addEventListener('click', this.scrub)
        this.containerRef.current!.addEventListener('mousemove', this.onMousemove)
    }

    componentWillUnmount() {
        this.containerRef.current!.removeEventListener('click', this.scrub)
        this.containerRef.current!.removeEventListener('mousemove', this.onMousemove)
    }

    scrub = (event: MouseEvent) => {
        console.log(event.target, event);
        if ((event.target as HTMLDivElement).className.includes('mouseDisplay')) return

        const scrubTime = (event.offsetX / this.containerRef.current!.offsetWidth) * this.props.totalTime;
        this.props.update(scrubTime)
    }

    onMousemove = (event: MouseEvent) => {
        // If mousedown
        if (event.buttons === 1) {
            this.scrub(event)
        }

        if ((event.target as HTMLDivElement).className.includes('mouseDisplay')) return

        let position = event.offsetX / this.containerRef.current!.offsetWidth
        this.setState({
            mousePositionPercentage: position
        })
    }

    render() {
        let bufferPercentage = this.props.bufferTime / this.props.totalTime * 100 || 0
        let currentPercentage = this.props.currentTime / this.props.totalTime * 100 || 0
        let mouseLeftPercentage = this.state.mousePositionPercentage * 100
        let mouseTooltipTime = formatTime(mouseLeftPercentage * this.props.totalTime / 100)

        return (
            <div className={styles.container} ref={this.containerRef}>
                <div className={styles.bar}>
                    <div className={`${styles.filled} ${styles.buffer}`} style={{ width: `${bufferPercentage}%` }}></div>
                    <div className={`${styles.filled} ${styles.current}`} style={{ width: `${currentPercentage}%` }}></div>
                    <div className={styles.mouseDisplay} style={{ left: `${mouseLeftPercentage}%` }}>
                        <div className={styles.mouseDisplayInner}>
                            <div className={`${styles.mouseDisplayTooltip} tooltip`}>
                                <div className={styles.mouseDisplayTooltipInner}>
                                    <span>{mouseTooltipTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProgressBar