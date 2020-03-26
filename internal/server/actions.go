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
		Type: "userJoined",
		Text: msg.Text,
	}

	sendMessageToAllClientsExcept(notificationMsg, msg.ClientID)
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
