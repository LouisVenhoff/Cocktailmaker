package internalInterface

import (
	"fmt"
	"net/url"

	"github.com/gorilla/websocket"
)

func SendToAddr(port string, payload string) {
	uri := url.URL{
		Scheme: "ws",
		Host:   "localhost:" + port,
		Path:   "/ws",
	}

	fmt.Println(uri.String())

	c, _, err := websocket.DefaultDialer.Dial(uri.String(), nil)
	defer c.Close()
	if err != nil {
		panic("Internal Websocket err " + err.Error())
	}

	err = c.WriteMessage(websocket.TextMessage, []byte(payload))

	if err != nil {
		panic("Internal Websocket err " + err.Error())
	}
}
