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