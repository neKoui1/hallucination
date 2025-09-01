package main

import "fmt"

func deferFunc() (i int) {
	defer func() {
		i++
		fmt.Println("defer func1 i = ", i)
	}()
	defer func() {
		i++
		fmt.Println("defer func2 i = ", i)
	}()
	return i
}
func main() {
	fmt.Println("deferFunc = ", deferFunc())
}
