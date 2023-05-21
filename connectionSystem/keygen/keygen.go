package keygen

import (
	"math/rand"
)

func GenerateKey(len int) string {

	outStr := ""

	for i := 0; i < len; i++ {
		randASCII := string(randNumber(65, 90))
		outStr = outStr + randASCII
	}

	return outStr

}

func randNumber(min, max int) int {
	return min + rand.Intn(max-min)
}
