package main

import (
	"fmt"
	"unsafe"
)

type interface2 struct {
	Type unsafe.Pointer
	Data unsafe.Pointer
}

func main() {
	var x interface{}
	x = 3
	v2 := (*interface2)(unsafe.Pointer(&x))
	fmt.Println(v2)
	fmt.Println(unsafe.Pointer(&x))
	fmt.Printf("%d\n", *(*int)(v2.Data))

}
