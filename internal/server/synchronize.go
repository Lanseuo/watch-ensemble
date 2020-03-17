package server

func handleReportStatus(msg Message) {
	clients[msg.ClientID].lastStatus = *msg.Status
	var timeDifferences []int

	for _, client := range clients {
		// Don't compare with itself
		if client.clientID == msg.ClientID {
			continue
		}

		if client.lastStatus.PlaybackState != "playing" {
			continue
		}

		timeDifference := msg.Status.CurrentTime - client.lastStatus.CurrentTime
		timeDifferences = append(timeDifferences, timeDifference)
	}

	if len(timeDifferences) == 0 {
		return
	}

	maxTimeDifference := findMax(timeDifferences)

	if msg.Status.PlaybackState == "playing" {
		if maxTimeDifference > 15 {
			sendMessageToClient(clients[msg.ClientID], Message{
				Type:     "setPlaybackState",
				Text:     "waiting",
				ClientID: "server",
				Date:     0,
			})
		}
	} else if msg.Status.PlaybackState == "waiting" {
		if maxTimeDifference < 5 {
			sendMessageToClient(clients[msg.ClientID], Message{
				Type:     "setPlaybackState",
				Text:     "playing",
				ClientID: "server",
				Date:     0,
			})
		}
	}
}
