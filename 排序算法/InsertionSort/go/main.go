package main

import "fmt"

func Less(nums []int, a int, b int) bool {
	if nums[a] < nums[b] {
		return true
	}
	return false
}

func InsertionSort(nums []int) {
	for i := 1; i < len(nums); i++ {
		for j := i; j > 0 && Less(nums, j, j-1); j-- {
			nums[j], nums[j-1] = nums[j-1], nums[j]
		}
	}
}

// 0 1 2 3 4 5 6
//-1 0 1 3 5 2 8
func main() {
	arr := []int{3, 1, 4, 1, 5, 9, 2, 6}
	InsertionSort(arr)
	fmt.Println(arr)
}
