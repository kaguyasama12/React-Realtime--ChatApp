const cors = require('cors');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router); 




let rooms = {};

io.on('connection', (socket) => {
  console.log('We have a new connection!!!');

  socket.on('join', ({name, room}, callback ) => {

    const { error, user } = addUser({ id: socket.id, name, room});

    if(error) {
      return callback(error);
    }

    socket.emit('message', { user: "admin", text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: "admin", text: `${user.name}, has joined!` });


    socket.join(user.room);

    callback();
  });

  socket.on('room', ({roomName, roomPass}, callback) => {
    rooms[roomName] = roomPass;
    console.log("below is rooms")
    console.log(rooms)
  })

  socket.on('find', ({roomName, roomPass, username}, callback) => {
    let passBool = true;
    let nameBool = true;
    let canEnter = false;
    if ( roomName in rooms ) {
      if ( rooms[roomName] != roomPass ) {
        passBool = false;
      } else {
        console.log("I am executed");
        socket.emit('join', { username, roomName}, () => {
        });
      }
    } else {
      nameBool = false;
    }
    
    
    if ((passBool && nameBool)) {
      canEnter = true;
    }
    callback({ nameBool, passBool, canEnter})


  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left!!!');
  })
});



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

