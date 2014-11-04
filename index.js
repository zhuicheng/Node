require('./lib/common'); // 扩展对象方法

var moduleObj = {
	socketServer: require('./lib/socket/socketServer').SocketServer,
	socketClient: require('./lib/socket/socketClient').SocketClient,
	webSocketServer: require('./lib/webSocket/webSocketServer').WebSocketServer
};

module.exports = moduleObj;