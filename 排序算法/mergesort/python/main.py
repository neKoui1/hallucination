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


    