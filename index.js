var express = require('express');
var socketio = require('socket.io');

const PORT = 3000;
const app = express();

app.use(express.static("public"));

const server = app.listen(PORT,() => {
    console.log(`connected on ${PORT}`);
})
const io = socketio(server);

var clientsCount = 0;
io.on('connection', function(socket) {
    // on connect active user count add
    clientsCount++;
    io.sockets.emit('live_user',{clientsCount: clientsCount});        
    
    // on disconnect active user count minus
    socket.on('disconnect',() => {
        clientsCount--;
        io.sockets.emit('live_user',{clientsCount});
    });

    // send message emit to display on page
    socket.on('send_message',(data) => {
        io.sockets.emit('send_message',{username: data.username,message: data.message});        
    });    
});