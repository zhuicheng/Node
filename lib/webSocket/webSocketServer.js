function WebSocketServer(opt) {
	var thiz = this;
	var options = require('../utils').clone(opt);
	var connect = require('connect');
	var app = connect(); // 中间件
	var socketio = require('socket.io');
	var path = require('path');
	var clients = [];

	var init = function() {
		options = (null === options || undefined === options) ? {} : options;
		options.port = typeof (options.port) === 'undefined' ? 8888 : options.port;
	};

	var bindEvent = function() {
		app.use(connect.logger('dev')); // 控制台打印级别
		app.use(connect.static(path.join(__dirname, '/src'))); // 静态文件目录
		
		app.use('/json', function(req, res) { // 异步请求调用方法
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.end(JSON.stringify(req.headers));
		});
		
		app.use('/', function(req, res) { // 加载页面时调用方法
			require('fs').readFile(path.join(__dirname, '/src/chat.html'), function(err, data) {
				if (err) {
					res.writeHead(500);
					res.end('Some error occured..');
				} else {
					res.writeHead(200);
					res.end(data);
				}
			});
		});

		socketio.listen(app).on('connection', function(client) {
			console.log('%j linked..', client.client.conn.remoteAddress);
			clients.push(client);
			// console.error(client.client.conn.remoteAddress);

			// 监听成功
			client.on('clientMessage', function(msg) {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i] !== client) {
						clients[i].emit('serverMessage', client.client.conn.remoteAddress + '：' + msg);
					}
				}
			});
			client.on('disconnect', function() {
				clients.splice(clients.indexOf(client), 1);
				console.log('%j has disconnected..', client.client.conn.remoteAddress);
			});
		});
	};

	this.getOptions = function() {
		return options;
	};

	this.start = function() {
		app.listen(options.port);
		console.log('Server start..');
	};

	init();
	bindEvent();
}

function OtherServer() {
	var http = require('http');
	var stic = require('node-static');
	var file = new stic.Server('./src', {
		cache: 0
	});
	var socketio = require('socket.io');
	var clients = [];

	var server = http.createServer(function(req, res) {
		file.serve(req, res, function(err, resErr) {
			if (err) {
				var content = new Buffer(new Date() + '：' + err + '\n');
				require('../utils').writeContent('./err.log', content);
				res.writeHead(err.status, err.headers);
				res.end();
			} else {
				require('fs').readFile(__dirname + '/src/chat.html', function(err, data) {
					if (err) {
						res.writeHead(500);
						res.end('Some error occured..');
					} else {
						res.writeHead(200);
						res.end(data);
					}
				});
			}
		});
	}).listen(8888);

	socketio.listen(server).on('connection', function(client) {
		console.log('%j linked..', client.client.conn.remoteAddress);
		clients.push(client);
		// console.error(client.client.conn.remoteAddress);

		// 监听成功
		client.on('clientMessage', function(msg) {
			for (var i = 0; i < clients.length; i++) {
				if (clients[i] !== client) {
					clients[i].emit('serverMessage', client.client.conn.remoteAddress + '：' + msg);
				}
			}
		});
		client.on('disconnect', function() {
			clients.splice(clients.indexOf(client), 1);
			console.log('%j has disconnected..', client.client.conn.remoteAddress);
		});
	});

	console.log('Server start..');
}

module.exports.WebSocketServer = WebSocketServer;
module.exports.OtherServer = OtherServer;