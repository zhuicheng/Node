function SocketServer(opt) {
	var thiz = this;
	var options = require('../utils').clone(opt);
	var socketServer = require('net').createServer();
	var clients = [];

	var init = function() {
		options = (null === options || undefined === options) ? {} : options;
		options.port = typeof (options.port) === 'undefined' ? 4001 : options.port;
	};

	var bindEvent = function() {
		socketServer.on('listening', function() {
			console.log('Server start listening：' + options.port);
		});

		socketServer.on('connection', function(s) {
			clients.push(s);
			console.error('Connection linked：' + s.remoteAddress + ':' + s.remotePort);
			s.write('Link successful..');

			s.on('data', function(data) {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i] !== s) {
						clients[i].write(s.remoteAddress + '：' + data.toString());
					}
				}
			});

			s.on('error', function(e) {
				var content = new Buffer(new Date() + '：' + s._peername.address + ':' + s._peername.port + ' ' + e + '\n');
				require('../utils').writeContent('./err.log', content);
			});

			s.on('close', function() {
				console.error('Connection close：' + s._peername.address + ':' + s._peername.port);
				clients.splice(clients.indexOf(s), 1);
			});
		});

		socketServer.on('close', function() {
			console.log('Server close..');
		});

		socketServer.on('error', function(e) {
			console.log(e);
		});
	};

	this.getOptions = function() {
		return options;
	};

	this.start = function() {
		socketServer.listen(options.port);
	};

	init();
	bindEvent();
}

module.exports.SocketServer = SocketServer;