function SocketClient(opt) {
	var thiz = this;
	var options = require('../utils').clone(opt);
	var socketClient = require('net').Socket();

	var init = function() {
		options = (null === options || undefined === options) ? {} : options;
		options.port = typeof (options.port) === 'undefined' ? 4001 : options.port;
		options.host = typeof (options.host) === 'undefined' ? '127.0.0.1' : options.host;
	};

	this.getOptions = function() {
		return options;
	};

	this.start = function() {
		socketClient.connect(options.port, options.host, function() {
			socketClient.on('data', function(data) {
				console.log(data.toString());
			});

			socketClient.on('error', function(error) {
				console.error('error：' + error);
			});

			socketClient.on('close', function() {
				console.log('连接关闭..');
				process.kill();
			});

			process.stdin.on('data', function(content) {
				socketClient.write(content);
			});
		});
		process.stdin.resume();
	};

	init();
}

module.exports.SocketClient = SocketClient;