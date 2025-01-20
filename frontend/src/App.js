import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'receiver' }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send the message to the server
      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'sender', user: userName }
      ]);
      setMessage('');

      // Set timeout to delete the message after 30 seconds
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.text !== message)
        );
      }, 30000); // 30 seconds
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsNameSet(true);
    }
  };

  return (
    <div className="chat-container">
      {isNameSet ? (
        <div className="chat-box">
          <div className="message-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'sender' ? 'sender-message' : 'receiver-message'}`}
              >
                <span className="message-sender">
                  {msg.sender === 'sender' ? msg.user : 'Other'}
                </span>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message as ${userName}`}
              className="message-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="name-prompt">
          <form onSubmit={handleNameSubmit}>
            <h2>Enter Your Name</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="name-input"
              required
            />
            <button type="submit" className="submit-name-button">
              Start Chat
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
