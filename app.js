const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// ExpressJS
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

// Socket.io
const allClients = [];
let clientConnected = undefined;
let online = 0;

// Connections management
io.on('connection', (socket) => {
    clientConnected = false;
    online++;

    if (online >= 1) {
        allClients.online = online;
    }

    for (var i = 0; i < allClients.length; i++) {
        if (allClients[i].id === socket.id) {
            clientConnected = true;
        }
    }
    
    if (clientConnected === false) {
        allClients.push(
            [{
                id: socket.id,
                ip: socket.handshake.address,
                time: socket.handshake.time
            }]
        );
    }
    
    console.info(`L'utilisateur "${allClients[0].id}" s\'est connecté.`);

    socket.on('disconnect', () => {
        online--;
        allClients.online = allClients.online - 1;
        clientConnected = false;
        console.log(`L'utilisateur "${allClients[0].id}" s\'est déconnecté`);
        
        for (var i = 0; i < allClients.length; i++) {
            if (allClients[i].id === socket.id) {
                allClients.splice(i, 1);
            }
        }

        if (online <= 0) {
                allClients.online = "No User connected";
        }

        // const i = allClients.indexOf(socket);
        console.info(allClients);
    });
    console.info(allClients);
})

io.on('msg', (msg) => {
    console.log('message: ' + msg);
});

server.listen(3000, () => {
    console.log('Listening now');
})