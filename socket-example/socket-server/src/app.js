const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = {};

// io.on("connection", socket => {
//   // ...
// });

io.on("connection", socket => {
    let previousId;
  
    safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
      previousId = currentId;
    };
  
    // ...
  });

  io.on("connection", socket => {
    // ...
  
    socket.on("getDoc", docId => {
      safeJoin(docId);
      socket.emit("document", documents[docId]);
    });
  
    // ...
  });

  io.on("connection", socket => {
    // ...
  
    socket.on("addDoc", doc => {
      documents[doc.id] = doc;
      safeJoin(doc.id);
      io.emit("documents", Object.keys(documents));
      socket.emit("document", doc);
    });
  
    // ...
  });

  io.on("connection", socket => {
    // ...
  
    socket.on("editDoc", doc => {
      documents[doc.id] = doc;
      socket.to(doc.id).emit("document", doc);
    });
  
    // ...
  });

  io.on("connection", socket => {
    // ...
  
    io.emit("documents", Object.keys(documents));
  
    console.log(`Socket ${socket.id} has connected`);
  });





  http.listen(4444, () => {
    console.log('Listening on port 4444');
  });