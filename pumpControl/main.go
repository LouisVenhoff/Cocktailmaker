package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"pumpcontroller/pumps"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsEndpoint)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "PumpServer OK")

}

func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()

		if err != nil {
			fmt.Println(err)
			return
		}

		processSwitch(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			fmt.Println(err)
			return
		}

	}
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New Connection!")
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
	}

	reader(ws)

}

type messageObj struct {
	PumpNr int
}

func processSwitch(messageJSON string) {

	var obj messageObj

	json.Unmarshal([]byte(messageJSON), &obj)

	fmt.Println(obj.PumpNr)

	pumps.SwitchPumpSave(obj.PumpNr, "LOW")

}

func main() {
	pumps.InitializePumps()
	setupRoutes()
	fmt.Println("Started")

	//pumps.SwitchPumpSave(8, "LOW")

	http.ListenAndServe(":8080", nil)
}
