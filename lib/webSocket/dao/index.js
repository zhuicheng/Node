var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'NODE',
	connectionLimit: 3
});

pool.getConnection(function(err, conn) {
	if (err) {
		console.error('%s', err);
		throw err;
	}
	conn.query('DROP DATABASE IF EXISTS NODE');
	conn.query('CREATE DATABASE IF NOT EXISTS NODE');
	conn.query('USE NODE');
	conn.query('CREATE TABLE IF NOT EXISTS T_ONLINE_USER (ID INT(11) AUTO_INCREMENT, IP VARCHAR(20), CREATE_TIME DATETIME, PRIMARY KEY(ID))');
	conn.release();
	console.log('数据库准备完毕..');
});

function insertIP(param) {
	pool.query('INSERT INTO T_ONLINE_USER (IP, CREATE_TIME) VALUES (?, ?)', [ param.IP, new Date() ], function(err, info) {
		if (err) {
			console.error('%s', err);
			throw err;
		}
		console.log(JSON.stringify(info));
	});
}

function deleteIP(param) {

}

module.exports.insertIP = insertIP;
module.exports.deleteIP = deleteIP;