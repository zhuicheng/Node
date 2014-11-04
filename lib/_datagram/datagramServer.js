require('../common');

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var clients = [];

server.on('message', function(msg, remote) {
	console.error(remote);

	if (!clients.contains(remote)) {
		clients.push(remote);
	}

	for (var i = 0; i < clients.length; i++) {
		if (clients[i] != remote) {
			server.send(msg, 0, msg.length, clients[i].port, clients[i].address);
		}
	}
});

server.bind(8888);
console.log('start..');