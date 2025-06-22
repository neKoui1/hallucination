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