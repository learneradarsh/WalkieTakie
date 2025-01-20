const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.get('/', (req, res) => {
  res.send('Secret Chat Server Running');
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle message received from client
  socket.on('sendMessage', (message) => {
    console.log('Message received: ', message);
    // Emit message to all clients except the sender
    socket.broadcast.emit('receiveMessage', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
