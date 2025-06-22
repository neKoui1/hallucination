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

使用`cpp`可以直接从下标动手

```cpp
#include<iostream>
#include<vector>
using namespace std;

// [ )
void Merge(vector<int>& nums, int start, int end) {
    if(end-start<=1) return;
    auto mid = (start+end) / 2;
    Merge(nums, start, mid);
    Merge(nums, mid, end);

    auto sortNums = vector<int>{};
    auto x_ptr = start, y_ptr = mid;
    while(x_ptr < mid && y_ptr < end) {
        if(nums[x_ptr] <= nums[y_ptr]) {
            sortNums.push_back(nums[x_ptr]);
            x_ptr++;
        } else {
            sortNums.push_back(nums[y_ptr]);
            y_ptr++;
        }
    }
    while(x_ptr<mid) sortNums.push_back(nums[x_ptr++]);
    while(y_ptr<end) sortNums.push_back(nums[y_ptr++]);
    for (int i = start; i < end; i++) {
        nums[i] = sortNums[i-start];
    }
}

int main() {
    vector<int> nums = {123,214,5432,53452,314,565,5};
    Merge(nums, 0, nums.size());
    for(auto val : nums) {
        cout << val << " ";
    }
}
```

```python
from typing import List

def mergesort(arr: List[int], start:int, end: int):
    """
    arr: 需要排序的数组
    start: 排序数组左端的下标
    end: 排序数组最右端的下标
    """
    if end - start <= 1:
        return
    mid = (start+end) // 2
    mergesort(arr, start, mid)
    mergesort(arr, mid, end)

    temp = list()
    x_ptr, y_ptr = start, mid
    while x_ptr < mid and y_ptr < end:
        if arr[x_ptr] <= arr[y_ptr]:
            temp.append(arr[x_ptr])
            x_ptr += 1
        else:
            temp.append(arr[y_ptr])
            y_ptr += 1
    while x_ptr < mid:
        temp.append(arr[x_ptr])
        x_ptr += 1
    while y_ptr < end:
        temp.append(arr[y_ptr])
        y_ptr += 1
    for i in range(start, end):
        arr[i] = temp[i-start]
    
a = [123,214,5432,53452,314,565,5]
mergesort(a, 0, len(a))
print(a)

```



时间复杂度`O(nlogn)`

空间复杂度`O(n)`

## 3. Bubble Sort

唯一真神

```go
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
```

```cpp
#include<iostream>
#include<vector>
using namespace std;

void BubbleSort(vector<int>& nums) {
    int n = nums.size();
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if (nums[j] > nums[j+1]) {
                swap(nums[j], nums[j+1]);
            }
        }
    }
}

int main () {
    vector<int> nums = {3, 45, 2, 5, 7, 21, 30};
    BubbleSort(nums);
    for(auto val : nums) {
        cout << val << " ";
    }
    cout << endl;
    return 0;
}
```

## 4. Insertion Sort

插入排序：类比发牌时到手上的切换排序。假设从左往右遍历，左边的序列都是排好序的，所以每遍历到下一位的元素就需要从后往前进行比较并移动数据，一直判断到比当前比较的数大为止

使用`bool`函数来作为数组中元素大小的判断

```go
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
```

```cpp
#include<iostream>
#include<vector>
using namespace std;

bool Less(vector<int>& nums, int i, int j) {
    if(nums[i] < nums[j]) return true;
    return false;
}

void InsertionSort(vector<int>& nums) {
    for(int i = 1; i < nums.size();i++) {
        for (int j = i; j > 0 && Less(nums, j, j-1); j--) {
            swap(nums[j], nums[j-1]);
        }
    }
}

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};
    InsertionSort(nums);
    for (int i = 0; i < nums.size();i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
    // i 是 nums的value
    for (auto i : nums) {
        cout << i << " ";
    }
}
```

## 5. Shell Sort

`Insertion Sort`是一种特殊的`Shell Sort`

类似插入排序，希尔排序每次都选择一个增量为`h`的子数组进行排列，从而减少一定量的比较和交换次数

确立循环条件为`j>=h`，确保数组不会越界和一定有一个前驱数组进行比较

使用`Knuth序列`的平均算法时间复杂度为O(N<sup>5/3</sup>)

```cpp
#include<iostream>
#include<vector>
using namespace std;

void ShellSort(vector<int>& nums) {
    int N = nums.size();
    int h = 1;
    while(h<N/3) h = 3*h+1;
    while(h>=1) {
        for(int i = h; i < N; i++) {
            for (int j = i; j >= h & nums[j] < nums[j-h]; j-=h) {
                swap(nums[j], nums[j-h]);
            }
        }
        h/=3;
    }
}

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};
    ShellSort(nums);
    for (auto val : nums) {
        cout << val << " ";
    }
}
```

```go
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

```



