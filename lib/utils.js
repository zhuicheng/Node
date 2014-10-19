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

/**
 * 对一个对象进行拷贝，并返回一个全新的对象
 * 
 * @param o
 */
function clone(o) {
	if (null !== o && typeof (o) === "object") {
		var obj = {};
		for ( var i in o) {
			switch (typeof (eval("o." + i))) {
			case "object":
				if (null == eval("o." + i)) {
					obj[i] = null;
				} else if (eval("o." + i) instanceof Array) {
					obj[i] = new Array();
					var arr = eval("o." + i);
					for (var j = 0; j < arr.length; j++) {
						obj[i].push(arr[j]);
					}
				} else {
					obj[i] = clone(eval("o." + i));
				}
				break;
			case "undefined":
				obj[i] = undefined;
				break;
			case "string":
				obj[i] = eval("o." + i) + "";
				break;
			case "number":
				obj[i] = eval("o." + i) + 0;
				break;
			case "boolean":
				obj[i] = eval("o." + i);
				break;
			case "function":
				obj[i] = eval("o." + i);
				break;
			}
		}
		return obj;
	} else {
		return o;
	}
}

/**
 * 往指定文件内写入内容
 * 
 * @param path
 * @param content
 */
function writeContent(path, content) {
	if (null === path || path === "") {
		throw new Error("文件路径不能为空");
	}

	var o = new Buffer(content);
	var fs = require("fs");
	fs.open(path, "a", function(e, fd) {
		if (e) {
			throw e;
		}
		fs.write(fd, content, 0, content.length, null, function(err, written) {
			if (err) {
				throw err;
			}
		});
	});
}

module.exports.isNull = isNull;
module.exports.isEmpty = isEmpty;
module.exports.iterateDirectory = iterateDirectory;
module.exports.clone = clone;
module.exports.writeContent = writeContent;