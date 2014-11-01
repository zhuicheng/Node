var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('message', function(msg, remote) {
	console.log("%j   %s:%s", msg.toString(), remote.address, remote.port);
});

setInterval(function() {
	var msg = new Buffer('hello world');
	server.send(msg, 0, msg.length, 8888, 'localhost');
}, 1000);