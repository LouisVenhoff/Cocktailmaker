package conManager

import (
	"comController/internalInterface"
	"comController/keygen"
	"encoding/json"
	"fmt"
)

var IsConnected bool = false
var sessionKey string = ""
var keyLen int = 10

func Initialize() {
	fmt.Println("Initializing conManager!")

	sessionKey = keygen.GenerateKey(keyLen)

}

type PayloadObj struct {
	Key     string
	Com     int
	Payload int
}

type LoginObj struct {
	Key string
}

type ResponseObj struct {
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
		if IsConnected == false {
			loginOut.Key = sessionKey
			IsConnected = true
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
		r.Code = 200
		byteArr, _ := json.Marshal(r)
		outStr = string(byteArr)
	}

	return outStr

}

func processOptionCmd(payload PayloadObj) {
	switch payload.Com {
	case OPTION:

	}
}
