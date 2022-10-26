const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config();

const server = require('http').createServer(app)
const PORT = process.env.PORT
server.listen(PORT, ()=> {
  console.log('server running at port ', PORT);
})


const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let activeUser = [];

io.on("connection", (socket) => {
  //add user
  // on là get
  socket.on("add-user", (newUserId) => {
    if (!activeUser.some((user) => user.userId === newUserId)) {
      activeUser.push({
        userId: newUserId,
        socketId: socket.id,
      }); 
    }

    // emit là send
    io.emit("get-user", activeUser);
  });
  socket.on('send-message', (data) => {
    const {receiverId} = data

    const user = activeUser.find((user) => user.userId === receiverId)

    if(user){
      io.to(user.socketId).emit('receive-message', data)
    }
  })
  socket.on("disconnect", () => {
    activeUser = activeUser.filter((user) => user.socketId !== socket.id);

    io.emit("get-user", activeUser);
  });
});




