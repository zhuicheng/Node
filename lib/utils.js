var fs = require('fs');
var path = require('path');

/**
 * 判断是否为空对象
 * 
 * @param o 判断对象
 * @returns {Boolean} 返回值
 */
function isNull(o) {
	if (o === null) {
		return true;
	}
	if (o === undefined) {
		return true;
	}
	return false;
}

/**
 * 判断是否为空值
 * 
 * @param o 判断对象
 * @returns {Boolean} 返回值
 */
function isEmpty(o) {
	if (isNull(o)) {
		return true;
	}
	if (o === '') {
		return true;
	}
	return false;
}

/**
 * 对指定目录进行迭代
 * 
 * @param dir 指定目录
 * @param dirCall 文件夹目标回调函数
 * @param fileCall 文件目标回调函数
 */
function iterateDirectory(dir, dirCall, fileCall) {
	dir = dir === undefined ? './' : dir;
	fs.readdirSync(dir).forEach(function(f) {
		var pathName = path.join(dir, f).replace(/\\/g, '/').toLocaleLowerCase();
		if (pathName === "node_modules" || path.extname(pathName) === '.json' || path.extname(pathName) === '.md' || pathName.indexOf('.') === 0) {
			return false;
		}

		if (fs.statSync(pathName).isDirectory()) {
			iterateDirectory(pathName, dirCall, fileCall);
			dirCall && dirCall(pathName);
		} else {
			fileCall && fileCall(pathName);
		}
	});
}

module.exports.iterateDirectory = iterateDirectory;