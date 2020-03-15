package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"regexp"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel
var upgrader = websocket.Upgrader{}
var lastVideoDetails VideoDetails

type Message struct {
	Type     string `json:"type"`
	Text     string `json:"text"`
	ClientID string `json:"clientId"`
	Date     int    `json:"date"`
}

type MessageWithVideoDetails struct {
	Type         string       `json:"type"`
	VideoDetails VideoDetails `json:"videoDetails"`
	ClientID     string       `json:"clientId"`
	Date         int          `json:"date"`
}

type VideoDetails struct {
	Title       map[string]string `json:"title"`
	Description map[string]string `json:"description"`
	URL         map[string]string `json:"url"`
	Languages   []string          `json:"languages"`
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	defer ws.Close()

	log.Println("Client successfully connected")
	clients[ws] = true

	if len(lastVideoDetails.URL) != 0 {
		sendMessageToClient(ws, MessageWithVideoDetails{
			Type:         "setVideoDetails",
			VideoDetails: lastVideoDetails,
			ClientID:     "server",
			Date:         0, // TODO
		})
	}

	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Println(err)
			delete(clients, ws)
			break
		}
		log.Println("New message", msg)
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		switch msg.Type {
		case "requestVideo":
			details, err := getVideoDetailsFromArte(msg.Text)
			if err != nil {
				fmt.Println("Error:", err)
			}
			lastVideoDetails = details
			sendMessageToAllClients(MessageWithVideoDetails{
				Type:         "setVideoDetails",
				VideoDetails: details,
				ClientID:     "server",
				Date:         0, // TODO
			})
		default:
			sendMessageToAllClients(msg)
		}
	}
}

func sendMessageToAllClients(msg interface{}) {
	for client := range clients {
		sendMessageToClient(client, msg)
	}
}

func sendMessageToClient(client *websocket.Conn, msg interface{}) {
	err := client.WriteJSON(msg)
	if err != nil {
		log.Println(err)
		client.Close()
		delete(clients, client)
	}
}

func getVideoDetailsFromArte(url string) (details VideoDetails, err error) {
	details.Title = make(map[string]string)
	details.Description = make(map[string]string)
	details.URL = make(map[string]string)

	r, _ := regexp.Compile(`\d+-\d+-A`)
	videoID := r.FindString(url)

	if videoID == "" {
		return details, errors.New("Can't find video")
	}

	for _, language := range []string{"de", "fr"} {
		apiURL := fmt.Sprintf("https://api.arte.tv/api/player/v1/config/%s/%s?platform=ARTE_NEXT", language, videoID)
		resp, err := http.Get(apiURL)
		if err != nil {
			return details, err
		}

		defer resp.Body.Close()

		type responseMediaVersion struct {
			URL string `json:"url"`
		}
		type responseVideoJSONPlayer struct {
			Title       string                          `json:"VTI"`
			Description string                          `json:"VDE"`
			VSR         map[string]responseMediaVersion `json:"VSR"`
		}
		type responseStruct struct {
			Details responseVideoJSONPlayer `json:"videoJsonPlayer"`
		}
		var response responseStruct
		json.NewDecoder(resp.Body).Decode(&response)

		details.Title[language] = response.Details.Title
		details.Description[language] = response.Details.Description
		details.URL[language] = response.Details.VSR["HTTPS_SQ_1"].URL
		details.Languages = append(details.Languages, language)
	}

	return details, nil
}

func main() {
	go handleMessages()

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)
	http.HandleFunc("/ws", wsEndpoint)

	log.Println("Server running on http://localhost:8080")
	log.Fatalln(http.ListenAndServe(":8080", nil))
}
