var http = require('http').createServer(index),
    io = require('socket.io').listen(http),
    fs = require('fs');

http.listen('8080');
function index(req,res){
	fs.readFile(__dirname + '/index.html', function(err, data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading index.html');
		}		

		res.writeHead(200);
		res.end(data);
	});
}

var view = 0;

io.sockets.on('connection', function(socket){
	socket.on('put', function (data) {
		view++;

		socket.emit('put', {'view': view});
		socket.broadcast.emit('put', {'view': view});
	});

	socket.on('disconnect', function(object){
		view--;

		socket.broadcast.emit('put', {'view': view});
	});
});

//connection.end();