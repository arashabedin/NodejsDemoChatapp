var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/',function(req,res){
res.sendFile(__dirname+"/index.html");
});

io.on('connection',function(socket){
io.emit('stream connect');
socket.on('chat happend', function(msg){
//console.log(msg);
io.emit('stream chat',msg);
});
socket.on('disconnect', function(){
io.emit('stream disconnect');
});
socket.on("someonewriting1", function(){
    io.emit("someonewriting");
});
socket.on("stoppedwriting1",function(){
    io.emit("stoppedwriting");
});
});

http.listen(8080, function(){
console.log('listening on *:8080');
});