/**
 * 日期对象增加天数
 * 
 * @param day 要增加的天数，可以为负数，但必须为整数
 * @returns {Date}
 */
Date.prototype.addDay = function(day) {
	if (null == day || isNaN(day)) {
		return this;
	}
	this.setDate(this.getDate() + day);
	return this;
};

/**
 * 判断数组集合中是否含有指定对象
 * 
 * @param o 要进行判断的对象
 * @returns {Boolean}
 */
Array.prototype.contains = function(o) {
	var flag = false;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == o) {
			flag = true;
			break;
		}
	}
	return flag;
};