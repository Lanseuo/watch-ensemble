let socket = new WebSocket("ws://localhost:8080/ws")
console.log("Attempting WebSocket Connection")

socket.onopen = () => {
    console.log("Successfully connected")
    socket.send("Hi from the client!")
}

socket.onmessage = message => {
    console.log(message)
}

socket.onclose = event => {
    console.log("Socket closed connection", event)
}

socket.onerror = error => {
    console.log("Socket error", error)
}