package main

import (
	"fmt"
	"time"
)

func ShellSort(nums []int) {
	n := len(nums)
	h := 1
	for h < n/3 {
		h = 3*h + 1
	}
	for h >= 1 {
		for i := h; i < n; i++ {
			for j := i; j >= h && nums[j] < nums[j-h]; j -= h {
				nums[j], nums[j-h] = nums[j-h], nums[j]
			}
		}
		h /= 3
	}
}

func main() {
	nums := []int{3, 1, 4, 1, 5, 9, 2, 6, 100, 98, 106, 356, 27, 29}
	startTime := time.Now()
	for i := 0; i < 100000; i++ {
		ShellSort(nums)
	}
	duration := time.Since(startTime)
	fmt.Println(nums)
	fmt.Printf("time = %d ns\n", duration.Nanoseconds()/100000)
}
