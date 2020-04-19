export function formatTime(totalSeconds: number) {
    function pad(n: number) {
        let width = 2
        let z = '0'
        let ns = Math.round(n) + ''
        return ns.length >= width ? n : new Array(width - ns.length + 1).join(z) + ns
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

declare var DocumentTouch: any

export function isTouchDevice() {
    // https://stackoverflow.com/a/4819886/9269863
    /*eslint-disable*/
    let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')

    let mq = function (query: string) {
        return window.matchMedia(query).matches
    }

    if (('ontouchstart' in window) || (<any>window).DocumentTouch && document instanceof DocumentTouch) {
        return true
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
    return mq(query)
    /*eslint-enable*/

}