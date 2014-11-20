console.log('文件正在生成..');

function Content() {
	var thiz = this;
	var content = [];

	var appendContent = function(o) {
		content.push(o);
	};

	this.getContent = function() {
		return content;
	};

	appendContent('// 在if(o) {} 的判断方法中，当o为0、false、null、undefined时不会进入方法体');
	appendContent('// Array对象具有map和forEach方法，map方法可以返回一个数组对象，而forEach不可以');
	appendContent('// Array对象的reduce方法用于将一个初始值和迭代参数对数组进行遍历：');
	appendContent('var arr = [ 1, 2, 3, 4 ];');
	appendContent('function itr(sum, o) {');
	appendContent('	return sum + o;');
	appendContent('}');
	appendContent('var sum = arr.reduce(itr, 0); // 10');
	appendContent('');
	appendContent('// Array对象的filter方法用于筛选符合条件的元素：');
	appendContent('var arr = [ 1, 2, 3, 4 ];');
	appendContent('function isEven(v) {');
	appendContent('	return v % 2 == 0;');
	appendContent('}');
	appendContent('var newArr = arr.filter(isEven); // [ 2, 4 ]');
}

var fs = require('fs');
fs.unlink('./exp.js', function() {
	fs.open('./exp.js', 'a', function(e, fd) {
		if (e) {
			throw e;
		}

		var content = new Content().getContent();
		for (var i = 0; i < content.length; i++) {
			var buffer = new Buffer(content[i] + '\n');
			fs.writeSync(fd, buffer, 0, buffer.length, null);
		}
		fs.close(fd);
	});
});
console.log('文件生成完毕');