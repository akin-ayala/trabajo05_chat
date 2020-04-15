var express = require('express');
var socket = require('socket.io');

var app = express();

app.set('port',process.env.PORT || 4000)
var server = app.listen(app.get('port'),function(){
  console.log('listening to requests on ptr 4000');
});


app.use(express.static('public'));


var io = socket(server);
io.on('connection',function(socket){
  console.log('made socket connection', socket.id)

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });

});
