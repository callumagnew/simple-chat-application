const http = require('http');
const { Server } = require ('socket.io');

const PORT = 8080;
const server = http.createServer();
const io = new Server(server, {
    cors: {origin: '*'}
});

io.on('connection', (socket) => {
    console.log('Socket connected');
    socket.on('message', (data) => {
        io.emit('message', data)
    })
});

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});