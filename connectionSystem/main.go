package main

import (
	"comController/conManager"
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Connectionsystem started")
}

func websocketRoute(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		// if conManager.IsConnected == true {
		// 	return false
		// } else {
		// 	return true
		// }
		return true
	}
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
		panic("Error while initializing Websocket")
	}

	wsReader(ws)

}

func wsReader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()

		if err != nil {
			conManager.IsConnected = false
			fmt.Println(err)
			return
		}

		if messageType == websocket.CloseGoingAway {
			conManager.IsConnected = false
		}

		if err != nil {
			panic("Reader err" + err.Error())
		}

		if err := conn.WriteMessage(messageType, p); err != nil {
			panic("Reader err" + err.Error())
		}

		fmt.Println(string(p))
		wsSend(conManager.ProcessPayload(string(p)), conn, messageType)
	}
}

func wsSend(msg string, conn *websocket.Conn, msgType int) {
	conn.WriteMessage(msgType, []byte(msg))
}

func setupRoutes() {
	http.HandleFunc("/", homepage)
	http.HandleFunc("/ws", websocketRoute)
}

func main() {

	conManager.Initialize()
	setupRoutes()
	http.ListenAndServe(":3014", nil)
	fmt.Println("Connection system stated!")

}
