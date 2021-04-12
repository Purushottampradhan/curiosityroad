//node server whis is handel socket io 
// const io = require('socket.io')(8000)

// const users={};
// io.on('connection',socket=>{
//     socket.on('user-joined',name=>{
//         console.log(name)
//         users[socket.id]=name;
//         socket.broadcast.emit('new user joined',name)
//     });

//     socket.on('send',message=>{
//         socket.broadcast.emit('recive',{message:message,name:user[socket.id]})
//     });
// })
// const express = require('express')
// const app = express();

// const http = require('http');
// const server = http.Server(app);

// const socketIO = require('socket.io');
// const io = socketIO(server);

// const port = process.env.PORT || 3000;

// io.on('connection', (socket) => {
//     console.log('user connected');
// });

// server.listen(port, () => {
//     console.log(`started on port: ${port}`);
// });
// io.on('new-message', (message) => {
//     io.emit(message);
//   });