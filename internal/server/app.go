package server

import (
	"fmt"
	"log"
	"net/http"

	"watchensemble/pkg/sources"

	"github.com/gorilla/websocket"
)

var clients = make(map[string]*Client) // connected clients
var broadcast = make(chan Message)     // broadcast channel
var upgrader = websocket.Upgrader{}
var lastVideoDetails sources.VideoDetails

type Client struct {
	clientID   string
	ws         *websocket.Conn
	lastStatus Status
	name       string
}

type Message struct {
	Type          string                `json:"type"`
	Text          string                `json:"text,omitempty"`
	PlaybackState string                `json:"playbackState,omitempty"`
	VideoDetails  *sources.VideoDetails `json:"videoDetails,omitempty"`
	Seconds       int                   `json:"seconds,omitempty"`
	Status        *Status               `json:"status,omitempty"`
	ClientList    []string              `json:"clientList,omitempty"`
	ClientID      string                `json:"clientId,omitempty"`
	Date          int                   `json:"date"`
}

type Status struct {
	PlaybackState string `json:"playbackState"`
	CurrentTime   int    `json:"currentTime"`
}

func StartServer() {
	go handleMessages()

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)
	http.HandleFunc("/ws", wsEndpoint)

	log.Println("Server running on http://localhost:8080")
	log.Fatalln(http.ListenAndServe(":8080", nil))
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	clientIDs, ok := r.URL.Query()["clientId"]
	if !ok || len(clientIDs) == 0 {
		fmt.Println("Parameter 'clientId' not present in websocket url")
		w.WriteHeader(400)
		return
	}
	clientID := clientIDs[0]

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer ws.Close()

	log.Printf("Client %v successfully connected", clientID)
	client := &Client{
		clientID: clientID,
		ws:       ws,
	}
	clients[clientID] = client

	welcomeClient(client)

	for {
		var msg Message
		msgString, err := parseWebsocketJSON(ws, &msg)
		if err != nil {
			clientLeftRoom(client.clientID)
			log.Println(err)
			delete(clients, clientID)
			setClientList()
			break
		}

		fmt.Printf("New message: %+v\n", msgString)
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		func() {
			switch msg.Type {
			case "join":
				join(msg)

			case "setPlaybackState":
				setPlaybackState(msg)

			case "requestVideo":
				requestVideo(msg)

			case "jumpToTime":
				jumpToTime(msg)

			case "reportStatus":
				handleReportStatus(msg)

			default:
				fmt.Printf("Error: Unknown message type '%v'\n", msg.Type)
			}
		}()
	}
}

func welcomeClient(client *Client) {
	if len(lastVideoDetails.URL) == 0 {
		return
	}

	var currentTimes []int
	otherClientsArePlaying := false
	for _, c := range clients {
		if client.clientID == c.clientID {
			continue
		}

		if c.lastStatus.PlaybackState == "" {
			continue
		}

		if c.lastStatus.PlaybackState != "paused" {
			otherClientsArePlaying = true
		}

		currentTimes = append(currentTimes, c.lastStatus.CurrentTime)
	}

	maxCurrentTime := findMax(currentTimes)

	playbackState := "paused"
	if otherClientsArePlaying {
		playbackState = "playing"
	}

	sendMessageToClient(client, Message{
		Type:          "setVideoDetails",
		VideoDetails:  &lastVideoDetails,
		Seconds:       maxCurrentTime,
		PlaybackState: playbackState,
		ClientID:      "server",
	})
}
