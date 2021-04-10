const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected'); // сообщение в консоль при connection

    socket.on('disconnect', () => {
        console.log('user disconnected'); // сообщение в консоль при disconnected
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);  // сообщение в консоль при отправке
        io.emit('chat message', msg); // отправить сообщение всем
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});