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

var visitas = 0;

io.sockets.on('connection', function(socket){

	socket.on('message', function(){
		visitas++;
		socket.emit('message', visitas);
		socket.broadcast.emit('message', visitas);
	});

	socket.on('disconnect', function(){
		visitas--;
		socket.broadcast.emit('message', visitas);
	});

});
