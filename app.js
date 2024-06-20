// Express section (Server init)
const express = require('express');
const app = express();
const serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);

console.info('server started');

// Socket.io section (Client/Server communication)
const io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket) {
    console.log('socket connection');

    socket.on('happyMsg', () => {
        console.log('I am happy !!!!!');
    })
});