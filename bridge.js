var net = require('net');
var mqtt = require('mqtt');

var brokerUrl = 'mqtt://orange-pi.local';

var io  = require('socket.io').listen(5000);
var client = mqtt.connect(brokerUrl, options);
 
/*SOCKET*/
io.sockets.on('connection', function (socket) {
	socket.on('subscribe', function (data) {
		//console.log('Subscribing to '+ data);
		client.subscribe(data);
	});

	socket.on('publish', function (data) {
		console.log('Publishing to '+ JSON.stringify(data));
		var json_data = JSON.parse(JSON.stringify(data));
		client.publish(json_data.topic, json_data.payload);
	});
});
 
/*MQTT*/
client.on('message', function(topic, payload){
  io.sockets.emit('mqtt',{'topic': String(topic),
    'payload':String(payload) });
});