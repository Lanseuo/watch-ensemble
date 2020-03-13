export function formatTime(totalSeconds) {
    function pad(n) {
        let width = 2
        let z = '0'
        n = Math.round(n) + ''
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    }

    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60

    if (hours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    } else {
        return `${pad(minutes)}:${pad(seconds)}`
    }
}