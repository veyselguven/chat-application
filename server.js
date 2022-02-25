const express = require("express");
const socket = require("socket.io");

const app = express();

const port = 3000;
const server = app.listen(port, () =>
  console.log(`server is running at ${port}`)
);

//to manage our code in browser side
app.use(express.static("public"));

// the things runs from localhost 3000
const io = socket(server);

// we  check the connection here if any connection happens it knows here
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  // we start here to listen the chat
  socket.on("chat", (data) => {
    // we have to send all data information to browser , we do that one by emit, we can send all our connection(browser)
    io.sockets.emit("chat", data);
  });

  //listening here
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
