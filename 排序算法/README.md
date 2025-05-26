# 排序算法

## 1. Quick Sort

1. 选取`pivot`。常用的选择有`a[left]` `a[right]` `a[middle]`，为避免最坏情况的时间复杂度，通常使用`a[middle]`
2. 调整分区。将所有小于`pivot`的元素都放在基准的左侧，大于的元素都在右侧
3. 递归处理。对`pivot`左侧和右侧的子列表进行递归处理
4. 合并。如果开辟了额外的存储空间，需要将两边列表进行合并，得到最后的排序结果。

### 一种比较巧妙的写法

```cpp
#include<iostream>
using namespace std;

void QuickSort(int nums[], int left, int right) {
    if(left >= right) {
        return;
    }
    int pivot = nums[(left+right) / 2];
    int i = left-1, j = right+1;
    while(i<j) {
        do i++; while(nums[i] < pivot);
        do j--; while(nums[j] > pivot);
        if(i<j) swap(nums[i], nums[j]);
    }
    QuickSort(nums, left, j);
    QuickSort(nums, j+1, right);
}

int main() {
    int a[5] = {5,3,1,2,8};
    QuickSort(a, 0, 4);
    for(int i = 0 ; i < 5; i++ ) {
        printf("%d ", a[i]);
    }
    return 0;
}
```

在一开始初始化的时候将`i=left-1`和`j=right+1`，在完全无视`=`边界处理的情况下，通过`do while`来避免数组越界的问题同时能够覆盖到所有元素

**最后的递归阶段，只能够使用`j`来作为递归的边界**

因为`nums[i]`可能`=pivot`导致右半部分的`[i, right]`仍包含`=pivot`的元素，无法保证递归规模的缩小，在遇到恒等数组时会陷入死循环

![img](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250523182815638.png)

而没有`do while`的语言...

```go
package main

import "fmt"

func QuickSort(nums []int, left int, right int) {
	if left >= right {
		return
	}

	pivot, i, j := nums[(left+right)/2], left-1, right+1
	for i < j {

		for {
			i++
			if !(nums[i] < pivot) {
				break
			}
		}

		for {
			j--
			if !(nums[j] > pivot) {
				break
			}
		}
		if i < j {
			nums[i], nums[j] = nums[j], nums[i]
		}
	}
	QuickSort(nums, left, j)
	QuickSort(nums, j+1, right)

}

func main() {
	nums := []int{5, 3, 1, 2, 8}
	QuickSort(nums, 0, 4)
	fmt.Println(nums)
}
```

这个样子就看上去不太简洁美观了

### 严格按照`Partition`的写法

使用三数取中拿到数组中的`pivot`

```go
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
```

`Partition`操作，令左边区间所有的数都<pivot，右边都>pivot，返回值为左分区的末尾和右分区的首个元素

```go
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
```

快速排序输入数组后递归

```go
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
```

完整的代码为

```go
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
```

时间复杂度`O(nlogn)`

空间复杂度`O(logn)`

## 2. Merge Sort

和快排不同

`Merge Sort`使用的是先递归后排序的策略，理解起来比较简单

```go
package main

import "fmt"

func MergeSort(nums []int) []int {
	if len(nums) <= 1 {
		return nums
	}
	mid := len(nums) / 2

	left := MergeSort(nums[:mid])
	right := MergeSort(nums[mid:])
	return Merge(left, right)
}

func Merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0
	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

func main() {
	arr := []int{38, 27, 43, 3, 9, 82, 10}
	sorted := MergeSort(arr)
	fmt.Println(sorted) // 输出 [3 9 10 27 38 43 82]
}
```

但是在cpp里面没有直接append数组的函数，因此需要从下标中动手



时间复杂度`O(nlogn)`

空间复杂度`O(n)`

