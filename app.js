const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// ExpressJS
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

// Socket.io
const allClients = [];

// Connections management
io.on('connection', (socket) => {
    allClients.push(
        {
            id: socket.id,
            ip: socket.handshake.address,
            time: socket.handshake.time
        }
    );

    console.info(`L'utilisateur "${allClients[0].id}" s\'est connecté.`);

    socket.on('disconnect', () => {
        // allClients.pop();
        console.log(`L'utilisateur "${allClients[0].id}" s\'est déconnecté`);
        
        const i = allClients.indexOf(socket);
        allClients.splice(i, 1);
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