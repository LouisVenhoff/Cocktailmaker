package conManager

import (
	"comController/internalInterface"
	"comController/keygen"
	"encoding/json"
	"fmt"
)

var IsConnected bool = false
var connectionCandidates int = 0

var sessionKey string = ""
var keyLen int = 10

var id string = ""

func Initialize() {
	fmt.Println("Initializing conManager!")

	sessionKey = keygen.GenerateKey(keyLen)
	id = keygen.GenerateKey(3)
}

type PayloadObj struct {
	Id      string
	Key     string
	Com     int
	Payload int
}

type LoginObj struct {
	Id  string
	Key string
}

type ResponseObj struct {
	Id   string
	Code int
}

type PumpObj struct {
	PumpNr int
}

const (
	LOGIN = 0
	OPTION
)

func ProcessPayload(rawPayload string) string {
	var data PayloadObj
	var loginOut LoginObj
	// var optionOut PayloadObj
	var outStr string = ""
	json.Unmarshal([]byte(rawPayload), &data)
	switch data.Key {
	case "":
		connectionCandidates++
		loginOut.Id = id
		if IsConnected == false {
			loginOut.Key = sessionKey
			IsConnected = true
			fmt.Println("Client connected!")
		} else {
			loginOut.Key = ""
		}
		byteArr, _ := json.Marshal(loginOut)
		outStr = string(byteArr)
	case sessionKey:
		var sendObj PumpObj
		sendObj.PumpNr = data.Payload
		sendStr, _ := json.Marshal(sendObj)

		internalInterface.SendToAddr("8080", string(sendStr))
		var r ResponseObj
		r.Id = id
		r.Code = 200
		byteArr, _ := json.Marshal(r)
		outStr = string(byteArr)
	}

	return outStr

}

func TriggerDisconnect() {

	if connectionCandidates != 0 {
		connectionCandidates--
	}

	if connectionCandidates == 0 {
		IsConnected = false
	}
}

func processOptionCmd(payload PayloadObj) {
	switch payload.Com {
	case OPTION:

	}
}
