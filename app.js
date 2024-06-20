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

const SOCKET_LIST = {};

// Socket.io section (Client/Server communication)
const io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket) {
    console.log('socket connection');
    
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    SOCKET_LIST['socket.id'] = socket;

    // socket.on('client2server', (data) => {
    //     console.log('client2server message + ' + data.reason);
    // })
});

setInterval(() => {
    for (let i in SOCKET_LIST) {
        const socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        socket.emit('newPosition' {
            x: socket.x,
            y: socket.y
        })
    }
}, 1000/25);