package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path"

	"watchensemble/pkg/sources"

	"github.com/gorilla/websocket"
)

var clients = make(map[string]*Client) // connected clients
var broadcast = make(chan Message)     // broadcast channel
var upgrader = websocket.Upgrader{}
var lastVideoDetails sources.VideoDetails

// Client stores information about websocket client
type Client struct {
	clientID   string
	ws         *websocket.Conn
	lastStatus Status
	name       string
}

// Message holds websocket message
type Message struct {
	Type          string                `json:"type"`
	Text          string                `json:"text,omitempty"`
	PlaybackState string                `json:"playbackState,omitempty"`
	VideoDetails  *sources.VideoDetails `json:"videoDetails,omitempty"`
	Seconds       int                   `json:"seconds,omitempty"`
	Status        *Status               `json:"status,omitempty"`
	ClientList    []string              `json:"clientList,omitempty"`
	SourceClient  string                `json:"sourceClient,omitempty"`
	ClientID      string                `json:"clientId,omitempty"`
	Date          int                   `json:"date"`
}

// Status stores information about current playback status of video
type Status struct {
	PlaybackState string `json:"playbackState"`
	CurrentTime   int    `json:"currentTime"`
}

// StartServer starts the websocket
func StartServer() {
	go handleMessages()

	http.HandleFunc("/ws", wsEndpoint)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fs := http.Dir("./static")
		fsh := http.FileServer(fs)
		_, err := fs.Open(path.Clean(r.URL.Path))
		// Show index.html on every page due to React router
		if os.IsNotExist(err) {
			r.URL.Path = "/"
		}

		fsh.ServeHTTP(w, r)
	})

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

			case "chatMessage":
				chatMessage(msg)

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
