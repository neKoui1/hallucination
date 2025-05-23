package main

import "fmt"

func SelectPivot(nums []int) int {
	n := len(nums)
	mid := n / 2
	if nums[0] > nums[mid] {
		nums[0], nums[mid] = nums[mid], nums[0]
	}
	if nums[0] > nums[n-1] {
		nums[0], nums[n-1] = nums[n-1], nums[0]
	}
	if nums[mid] > nums[n-1] {
		nums[mid], nums[n-1] = nums[n-1], nums[mid]
	}
	return nums[mid]
}

func Partition(nums []int, pivot int) (int, int) {
	left, right := 0, len(nums)-1
	i := left
	for i <= right {
		if nums[i] < pivot {
			nums[i], nums[left] = nums[left], nums[i]
			i++
			left++
		} else if nums[i] > pivot {
			nums[i], nums[right] = nums[right], nums[i]
			right--
		} else {
			i++
		}
	}
	return left - 1, right + 1
}

func QuickSort(nums []int) {
	if len(nums) <= 1 {
		return
	}
	pivot := SelectPivot(nums)
	left, right := Partition(nums, pivot)
	fmt.Println("pivot = ", pivot)
	fmt.Println("nums = ", nums)
	fmt.Printf("left = %d, right = %d\n", left, right)
	QuickSort(nums[:left+1])
	QuickSort(nums[right:])
}

func main() {
	arr := []int{3, 1, 4, 1, 5, 9, 2, 6}
	QuickSort(arr)
	fmt.Println(arr)
}
