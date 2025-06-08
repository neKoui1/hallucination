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