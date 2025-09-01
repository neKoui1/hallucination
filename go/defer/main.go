package main

import "fmt"

func main() {
	defer func() {
		fmt.Println("defer 1")
		if err := recover(); err != nil {
			fmt.Println("err: ", err)
		}
	}()
	defer func() {
		fmt.Println("defer 2")
	}()
	panic("触发异常")
	defer func() {
		fmt.Println("defer 3")
	}()
}
