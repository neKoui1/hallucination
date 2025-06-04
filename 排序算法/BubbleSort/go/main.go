package main

import "fmt"

func BubbleSort(nums []int) {
	n := len(nums)
	if n <= 1 {
		return
	}
	for i := 0; i < n-1; i++ {
		for j := 0; j < n-1-i; j++ {
			if nums[j] > nums[j+1] {
				nums[j], nums[j+1] = nums[j+1], nums[j]
			}
		}
	}
}

func main() {
	arr := []int{3, 1, 4, 1, 5, 9, 2, 6}
	BubbleSort(arr)
	fmt.Println(arr)
}
