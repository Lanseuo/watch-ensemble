package server

import "log"

func sendMessageToAllClients(msg Message) {
	for _, client := range clients {
		sendMessageToClient(client, msg)
	}
}

func sendMessageToAllClientsExcept(msg Message, clientID string) {
	for _, client := range clients {
		if client.clientID == clientID {
			continue
		}

		sendMessageToClient(client, msg)
	}
}

func sendMessageToClient(client *Client, msg Message) {
	msg.ClientID = "server"
	msg.ClientID = "TODO"

	err := client.ws.WriteJSON(msg)
	if err != nil {
		log.Println(err)
		client.ws.Close()
		delete(clients, client.clientID)
	}
}
