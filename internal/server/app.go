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
}

type Message struct {
	Type         string                `json:"type"`
	Text         string                `json:"text"`
	VideoDetails *sources.VideoDetails `json:"videoDetails,omitempty"`
	Seconds      int                   `json:"seconds"`
	Status       *Status               `json:"status,omitempty"`
	ClientID     string                `json:"clientId,omitempty"`
	Date         int                   `json:"date"`
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

	go welcomeClient(client)

	for {
		var msg Message
		msgString, err := parseWebsocketJSON(ws, &msg)
		if err != nil {
			log.Println(err)
			delete(clients, clientID)
			break
		}

		fmt.Printf("New message: %+v\n", msgString)
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		go func() {
			switch msg.Type {
			case "setPlaybackState":
				sendMessageToAllClients(msg)

			case "requestVideo":
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
					ClientID:     "server",
				})

			case "jumpToTime":
				resetLastStatuses()
				sendMessageToAllClients(msg)

			case "reportStatus":
				handleReportStatus(msg)

			default:
				fmt.Printf("Error: Unknown message type '%v'\n", msg.Type)
			}
		}()
	}
}

func sendMessageToAllClients(msg Message) {
	for _, client := range clients {
		// Don't send back to sender
		if client.clientID == msg.ClientID {
			continue
		}

		sendMessageToClient(client, msg)
	}
}

func sendMessageToClient(client *Client, msg Message) {
	// TODO: Set date

	err := client.ws.WriteJSON(msg)
	if err != nil {
		log.Println(err)
		client.ws.Close()
		delete(clients, client.clientID)
	}
}

func welcomeClient(client *Client) {
	if len(lastVideoDetails.URL) == 0 {
		return
	}

	sendMessageToClient(client, Message{
		Type:         "setVideoDetails",
		VideoDetails: &lastVideoDetails,
		ClientID:     "server",
	})

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
			fmt.Println("lastStatus:", c.lastStatus.PlaybackState)
			otherClientsArePlaying = true
		}

		currentTimes = append(currentTimes, c.lastStatus.CurrentTime)
	}

	fmt.Println("currentTimes", currentTimes)

	if len(currentTimes) == 0 {
		return
	}
	maxCurrentTime := findMax(currentTimes)
	if maxCurrentTime != 0 {
		sendMessageToClient(client, Message{
			Type:     "jumpToTime",
			Seconds:  maxCurrentTime,
			ClientID: "server",
		})
	}

	fmt.Println(otherClientsArePlaying)

	if otherClientsArePlaying {
		sendMessageToClient(client, Message{
			Type:     "setPlaybackState",
			Text:     "playing",
			ClientID: "server",
		})
	}
}
