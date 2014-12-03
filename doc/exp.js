// 在if(o) {} 的判断方法中，当o为0、false、null、undefined时不会进入方法体
// Array对象具有map和forEach方法，map方法可以返回一个数组对象，而forEach不可以
// Array对象的reduce方法用于将一个初始值和迭代参数对数组进行遍历：
var arr = [ 1, 2, 3, 4 ];
function itr(sum, o) {
	return sum + o;
}
var sum = arr.reduce(itr, 0); // 10

// Array对象的filter方法用于筛选符合条件的元素：
var arr = [ 1, 2, 3, 4 ];
function isEven(v) {
	return v % 2 == 0;
}
var newArr = arr.filter(isEven); // [ 2, 4 ]

// !~ 用于是否匹配： !~array.indexOf("xxx");
