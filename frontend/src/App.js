import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

// Connect to the backend WebSocket server
const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(null);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      // Display message and set a timer to delete it after 5 minutes
      setMessages((prevMessages) => [...prevMessages, msg]);
      setTimer(setTimeout(() => {
        setMessages((prevMessages) => prevMessages.filter((m) => m !== msg));
      }, 5 * 60 * 1000)); // 5 minutes in milliseconds
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message); // Send message to the backend
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Secret Chat</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
