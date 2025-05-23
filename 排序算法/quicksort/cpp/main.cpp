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