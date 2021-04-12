// node server whis is handel socket io
// const io = require('socket.io')(8000)

// // console.log(io)
// const users={};
// io.on('connection', socket=>{
//     socket.on('new-user-joined',name=>{
//         console.log(name)
//         users[socket.id]=name;
//         socket.broadcast.emit('user-joined',name)
//     });

//     socket.on('send',message=>{
//         socket.broadcast.emit('recive',{message:message,name:user[socket.id]})
//     });
// })
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });


server.listen(3000, () => {
  console.log("listening on *:3000");
});
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
//   });

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });

  