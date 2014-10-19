var moduleObj = {
	socketServer : require('./lib/socket/socketServer').SocketServer,
	socketClient : require('./lib/socket/socketClient').SocketClient
};

module.exports = moduleObj;
