#include <bits/stdc++.h>

using namespace std;

int main()
{
	// int m, n;
	// cin >> m >> n;//m代表珠子个数,n代表有n种颜色
	// int *a = new int[m+1];
	// int cnt = 0, pos = 0, ans = INT_MAX;
	// for (int i = 0; i < m; i++) cin >> a[i];//下标代表珠子,值代表颜色

	// map<int, int>mp;//下标(珠子)到颜色的映射
	// for (int j = 0; j < m; j++) {//j代表每次截取珠子的起点位置
	// 	cnt = 0;//初始化,记录每次遍历到出现的颜色不同的次数
	// 	mp.clear();//初始化
	// 	pos = 0;
	// 	for (int i = j; i < m; i++) {
	// 		if (mp[a[i]] == 0) {//该颜色第一次出现
	// 			cnt += 1; 
	// 			mp[a[i]]++;
	// 		}
	// 		if (cnt == n) {
	// 			pos = i - j; //找到第一次满足条件的位置
	// 			break;
	// 		}
	// 	}
	// 	ans = min(ans, pos);//ans即为答案

	// } 
	// cout << ans << endl;
	int a[5] = {1,2,3,4,5};
	int (*p)[5] = &a;

	return 0;
}