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