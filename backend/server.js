const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importing the CORS package

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',  // Allow all origins, or replace with your specific React app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

// Use CORS middleware for Express (to handle HTTP requests)
app.use(cors({
  origin: 'http://localhost:3000', // Allow all origins or specify your React app's IP or URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Serve static files from the React app (after building it)
app.use(express.static('client/build'));

// Simple route for testing the server
app.get('/', (req, res) => {
  res.send('Chat server is running!');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for incoming messages from clients
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);

    // Broadcast message to all connected clients
    io.emit('receiveMessage', message);

    // Automatically delete message after 30 seconds
    setTimeout(() => {
      socket.emit('deleteMessage', message);
      console.log('Message deleted after 30 seconds');
    }, 30000);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Define the server port
const PORT = process.env.PORT || 5000;
const IP = '0.0.0.0';  // Listen on all network interfaces

// Start the server
server.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}`);
});
