let socket = new WebSocket('ws://localhost:8080/ws')
console.log('Attempting WebSocket Connection')

socket.onopen = () => {
    console.log('Successfully connected')
    sendMessage('message', 'Hi from the client!')
}

socket.onmessage = event => {
    let message = JSON.parse(event.data)
    console.log('Got message', message)
}

socket.onclose = event => {
    console.log('Socket closed connection', event)
}

socket.onerror = error => {
    console.log('Socket error', error)
}

function sendMessage(type, text) {
    let clientID = 'clientId'

    let message = {
        type,
        text,
        id: clientID,
        date: Date.now()
    }

    socket.send(JSON.stringify(message))
}

let button = document.getElementById('button')
button.addEventListener('click', () => {
    sendMessage('button', 'test')
})