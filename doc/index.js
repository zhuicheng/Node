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

	appendContent('JavaScript：');
	appendContent('在if(o) {} 的判断方法中，当o为0、false、null、undefined时不会进入方法体');
	appendContent('Array对象具有map和forEach方法，map方法可以返回一个数组对象，而forEach不可以');
	appendContent('NodeJs：');
	appendContent('Chpt03 Loading Modules：');
	appendContent('模块在首次加载后会被缓存起来，如果模块名能被解析为相同的文件名，则每次调用require均会返回同一模块（不要轻易修改引用模块的属性或方法，否则会影响到整个项目）');
}

var fs = require('fs');
fs.unlink('./exp.log', function() {
	fs.open('./exp.log', 'a', function(e, fd) {
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