var mysql = require('mysql');
var transaction = require('node-mysql-transaction');

var trCon = transaction({
	connection : [ mysql.createConnection, {
		host : '192.168.20.239',
		user : 'root',
		password : 'root',
		database : 'NODE'
	} ],
	dynamicConnection : 32,
	idleConnectionCutoffTime : 1000,
	timeout : 0
});

var chain = trCon.chain();

chain.on('commit', function() {
	console.log('number commit');
}).on('rollback', function(err) {
	console.log(err);
});

chain.query("INSERT INTO T_ONLINE_USER (ID, IP) VALUES ('123', '123')");