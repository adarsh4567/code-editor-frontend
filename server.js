const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);  // Create an HTTP server
const {Server} = require("socket.io");  // import socket.io
const ACTIONS = require('./src/Actions');
const io = new Server(server);

app.use(express.static('build'));

app.use((req,res,next)=>{
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId)|| []).map((socketId) => {
        return{
            socketId,
            username: userSocketMap[socketId]
        };
    }
    );
}

io.on('connection',(socket)=>{    // listen for the connection event
    console.log('socket Connected',socket.id);

    socket.on(ACTIONS.JOIN,({roomId,username})=>{  // listen for the join event from client
        userSocketMap[socket.id]=username;   // store the username in the userSocketMap
        socket.join(roomId);                 // join the room
        const clients = getAllConnectedClients(roomId);  // get all the clients in the room
        clients.forEach(({socketId})=>{   // emit the join event to all the clients in the room
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,   // send the list of clients in the room
                username,   // send the username of the client who joined
                socketId: socket.id  // send the socketId of the client who joined
            })
        })
    })
    socket.on(ACTIONS.CODE_CHANGE,({roomId,code})=>{   // listen for the code-change event from client
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code});
    }) 
    socket.on(ACTIONS.SYNC_CODE,({socketId,code})=>{   // listen for the code-change event from client
        io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code});
    }) 
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // start the server
});