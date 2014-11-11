var data = function() {
	this.id = require('node-uuid').v4();
	this.ip = null;
	this.create_time = null;
}

data.prototype.getId = function() {
	return this.id;
}

data.prototype.getIp = function() {
	return this.ip;
}

data.prototype.setIp = function(ip) {
	this.ip = ip;
}

data.prototype.getCreateTime = function() {
	return this.create_time;
}

data.prototype.setCreateTime = function(create_time) {
	this.create_time = create_time;
}

module.exports = {
	func : data,
	primary : [ {
		name : "id",
		type : "VARCHAR"
	} ],
	fields : [ "id", "ip", "create_time" ],
	tableName : "T_ONLINE_USER"
}