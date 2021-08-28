const express = require("express");
const ws = require("ws");

const app = express();

app.use(express.static("public"));

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  const userId = Date.now();
  console.log("Client registered", userId);

  socket.on("message", (message) => {
    console.log(`Message \nClient: ${userId} \nMessage: ${message.toString()}`);

    // wsServer.clients.forEach((client) => {
    //   console.count("Client");
    //   client.send("FOo");
    // });

    socket.send("Message received!!!", (err) => {
      err && console.log(err);
    });
  });
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server

const PORT = 3000;
const server = app.listen(PORT);

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});

console.log(`Server running on port: ${PORT}`);
