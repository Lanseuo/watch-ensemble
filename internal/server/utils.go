package server

import (
	"bytes"
	"encoding/json"

	"github.com/gorilla/websocket"
)

func findMax(a []int) (max int) {
	max = a[0]
	for _, value := range a {
		if value > max {
			max = value
		}
	}
	return max
}

func parseWebsocketJSON(ws *websocket.Conn, v interface{}) (string, error) {
	_, reader, err := ws.NextReader()
	if err != nil {
		return "", err
	}

	buf := new(bytes.Buffer)
	buf.ReadFrom(reader)
	msgString := buf.String()

	err = json.Unmarshal([]byte(msgString), v)
	return msgString, err
}
