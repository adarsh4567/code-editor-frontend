const express = require('express');
const app = express();
const http = require('http')   
const {Server} = require("socket.io");  // import socket.io
const ACTIONS = require('./src/Actions');
const server = http.createServer(app);  // create http server
const io = new Server(server);        // create socket.io server

io.once('connection',(socket)=>{  // Socket is connected here
    console.log('socket Connected',socket.id);

    socket.on(ACTIONS.JOIN,({roomId,username})=>{

    })
})

const PORT = process.env.PORT || 5000;  // set port

server.listen(PORT, () => {      // Server is listening here
    console.log(`Server is running on port ${PORT}`);
});