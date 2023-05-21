package pumps

import (
	"fmt"

	"github.com/stianeikeland/go-rpio/v4"
)

var pump0 rpio.Pin
var pump1 rpio.Pin
var pump2 rpio.Pin
var pump3 rpio.Pin
var pump4 rpio.Pin
var pump5 rpio.Pin
var pump6 rpio.Pin
var pump7 rpio.Pin
var pump8 rpio.Pin

const (
	p1     = 4
	p2 int = 17
	p3 int = 27
	p4 int = 22
	p5 int = 9
	p6 int = 10
	p7 int = 11
	p8 int = 5
)

const (
	ON  string = "LOW"
	OFF string = "HIGH"
)

func InitializePumps() {

	err := rpio.Open()

	if err != nil {
		return
	}

	pump1 = rpio.Pin(p1)
	pump2 = rpio.Pin(p2)
	pump3 = rpio.Pin(p3)
	pump4 = rpio.Pin(p4)
	pump5 = rpio.Pin(p5)
	pump6 = rpio.Pin(p6)
	pump7 = rpio.Pin(p7)
	pump8 = rpio.Pin(p8)

	pumpArr := [8]rpio.Pin{pump1, pump2, pump3, pump4, pump5, pump6, pump7, pump8}

	for i := 0; i < len(pumpArr); i++ {
		pumpArr[i].Output()
		pumpArr[i].High()
		//switchPump(pumpArr[i], OFF);
	}

	fmt.Println("Initialized GPIO")

}

func SwitchPump(pump rpio.Pin, state string) {
	if state == ON {
		pump.Low()
	} else {
		pump.High()
	}
}

func getPump(pumpNr int) (*rpio.Pin, bool) {
	switch pumpNr {
	case 1:
		return &pump1, false
	case 2:
		return &pump2, false
	case 3:
		return &pump3, false
	case 4:
		return &pump4, false
	case 5:
		return &pump5, false
	case 6:
		return &pump6, false
	case 7:
		return &pump7, false
	case 8:
		return &pump8, false
	case 0:
		return &pump0, true
	default:
		panic("pumps.getPump no valid input!")
	}
}

func SwitchPumpSave(pumpNr int, state string) {
	InitializePumps()

	var actualPump *rpio.Pin

	actualPump, off := getPump(pumpNr)

	if off == true {
		return
	}

	SwitchPump(*actualPump, state)

}

// func main() {
// 	initializePumps()
// 	fmt.Println("Pumpcontroller started!")
// }
