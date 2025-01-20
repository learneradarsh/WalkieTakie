const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configure Socket.io with CORS support
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your React app's origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["my-custom-header"], // You can add custom headers if needed
    credentials: true // Optional, allow credentials such as cookies
  }
});

app.get('/', (req, res) => {
  res.send('Secret Chat Server Running');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('sendMessage', (message) => {
    console.log('Message received: ', message);
    socket.broadcast.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
