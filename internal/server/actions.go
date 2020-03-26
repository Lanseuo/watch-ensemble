package server

import (
	"fmt"
	"watchensemble/pkg/sources"
)

func join(msg Message) {
	fmt.Printf("Client %v joined as '%v'\n", msg.ClientID, msg.Text)
	for _, client := range clients {
		if client.clientID == msg.ClientID {
			client.name = msg.Text
		}
	}

	notificationMsg := Message{
		Type: "clientJoined",
		Text: msg.Text,
	}

	sendMessageToAllClientsExcept(notificationMsg, msg.ClientID)
}

func clientLeftRoom(clientID string) {
	fmt.Printf("Client %v left\n", clientID)
	var clientName string

	for _, client := range clients {
		if client.clientID == clientID {
			clientName = client.name
			break
		}
	}

	notificationMsg := Message{
		Type: "clientLeft",
		Text: clientName,
	}

	sendMessageToAllClientsExcept(notificationMsg, clientID)
}

func setPlaybackState(msg Message) {
	sendMessageToAllClientsExcept(msg, msg.ClientID)
}

func requestVideo(msg Message) {
	details, err := sources.GetVideoDetails(msg.Text)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	lastVideoDetails = details

	resetLastStatuses()

	sendMessageToAllClients(Message{
		Type:         "setVideoDetails",
		VideoDetails: &details,
	})
}

func jumpToTime(msg Message) {
	resetLastStatuses()
	sendMessageToAllClientsExcept(msg, msg.ClientID)
}
