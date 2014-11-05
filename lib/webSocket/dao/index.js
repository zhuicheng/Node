var mysql = require('mysql');
var uuid = require('node-uuid');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	connectionLimit: 3,
	debug: false
});

pool.getConnection(function(err, conn) {
	if (err) {
		console.error('%s', err);
		throw err;
	}
	conn.query('DROP DATABASE IF EXISTS NODE');
	conn.query('CREATE DATABASE IF NOT EXISTS NODE');
	conn.query('USE NODE');
	conn.query('CREATE TABLE IF NOT EXISTS T_ONLINE_USER (ID VARCHAR(36), IP VARCHAR(20), CREATE_TIME DATETIME, PRIMARY KEY(ID))');
	conn.release();
	console.log('数据库准备完毕..');
	pool.config.connectionConfig.database = 'NODE';
});

function selectCount(param, callback) {
	param = param ? param : {};

	pool.query('SELECT COUNT(1) AS TOTAL FROM T_ONLINE_USER T WHERE T.IP = ?', [ param.IP ], function(err, rows, fields) {
		if (err) {
			console.error('%s', err);
			throw err;
		}

		if (callback && typeof (callback) == 'function') {
			callback(rows[0].TOTAL);
		}
	});
}

function insertData(param, callback) {
	param = param ? param : {};

	pool.query('INSERT INTO T_ONLINE_USER (ID, IP, CREATE_TIME) VALUES (?, ?, ?)', [ uuid.v4(), param.IP, new Date() ], function(err, info) {
		if (err) {
			console.error('%s', err);
			throw err;
		}

		if (callback && typeof (callback) == 'function') {
			callback(info.affectedRows);
		}
	});
}

function updateData(param, callback) {
	param = param ? param : {};
	pool.query('UPDATE T_ONLINE_USER T SET T.CREATE_TIME = ? WHERE T.IP = ?', [ new Date(), param.IP ], function(err, info) {
		if (err) {
			console.error('%s', err);
			throw err;
		}

		if (callback && typeof (callback) == 'function') {
			callback(info.affectedRows);
		}
	});
}

function deleteData(param, callback) {
	param = param ? param : {};

	pool.query('DELETE FROM T_ONLINE_USER WHERE IP = ?', [ param.IP ], function(err, info) {
		if (err) {
			console.error('%s', err);
			throw err;
		}

		if (callback && typeof (callback) == 'function') {
			callback(info.affectedRows);
		}
	});
}

module.exports.selectCount = selectCount;
module.exports.insertData = insertData;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;
