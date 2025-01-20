# Secret Chat App (In-House)

## 🚀 Project Overview

This project is designed to provide a **secure and private chat platform** for internal use, allowing users to have conversations within their local home Wi-Fi network. The app focuses on **real-time communication** and **temporary message storage** where messages are automatically deleted after 5 minutes once they've been delivered. This setup ensures the privacy of your conversations by preventing the exposure of data to public servers or databases.

The goal of the project is to create a simple, secure, and ephemeral messaging system, where conversations stay private and don't persist beyond the intended time frame.

## 💡 Intention Behind the Project

The **Secret Chat App** is built for **in-house conversations** where you don't want any messages to be stored permanently or exposed to external servers. This allows for **secret and temporary communication** between devices on the same Wi-Fi network, ensuring that the messages **self-destruct** after being received by the recipient.

By avoiding third-party services or databases, the app ensures that your conversations remain completely local and safe from external surveillance or data mining.

## 🏗️ Architecture

The architecture of the app is simple yet effective, consisting of:

### 1. **Frontend: React App**
    - **Real-time messaging:** The frontend uses **React** for rendering the user interface and handling user interactions. It connects to the backend via **WebSocket** to send and receive messages in real-time.
    - **Message display:** Messages are displayed in a chat window, and once received, they are shown for a limited time (5 minutes).
    - **Temporary message storage:** Messages are stored in-memory and are automatically deleted after the specified time.

### 2. **Backend: Node.js WebSocket Server**
    - **WebSocket Communication:** The backend is powered by a **Node.js server** that uses **WebSocket** (via `socket.io`) for real-time communication. The server listens for incoming messages and broadcasts them to all connected clients.
    - **In-memory message storage:** Messages are temporarily stored in the server's memory (not in a database). Each message is assigned a timestamp, and once delivered, it is set to be deleted after 5 minutes.
    - **Local network communication:** The server is set up to run on your home Wi-Fi network, ensuring that it is accessible only within the local network for privacy and security.

### 3. **Message Expiry Mechanism**
    - Messages are destroyed from the server's memory after 5 minutes of being delivered to the recipient. This ensures that no message persists beyond its useful lifespan.

## 🛠️ Technology Stack

- **Frontend:** React, WebSocket (`socket.io-client`)
- **Backend:** Node.js, Express, WebSocket (`socket.io`)
- **Local Network Communication:** TCP/IP over home Wi-Fi network (no external servers involved)
- **Message Expiry:** In-memory storage and setTimeout for automatic deletion

## ⚙️ Features

- **Ephemeral Messages:** Messages are deleted automatically after 5 minutes of being received.
- **Real-time Communication:** Instant message delivery using WebSockets.
- **Local Network Only:** The server runs within your home Wi-Fi network, making it inaccessible to external devices.
- **No Database:** No messages are stored persistently; everything is handled in memory and discarded after use.
- **Private Conversations:** Conversations are private to the local network and are not exposed to any public servers or third-party services.

## 📝 How to Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/learneradarsh/WalkieTakie
cd WalkieTakie
```

### 2. Install dependencies
For the frontend (React app):
```bash
cd frontend
npm install
```

For the backend (Node.js server):
```bash
cd backend
npm install
```

### 3. Start the Backend Server
Make sure the backend server is listening on the local network, allowing other devices on your Wi-Fi network to connect:
```bash
cd backend
npm start
```
This will start the server on port 5000 by default. The server will now be available on your home network.

### 4. Start the Frontend App
To start the React app:
```bash
cd frontend
npm start
```
The frontend will be available at http://localhost:3000, and it will connect to the WebSocket server running on http://localhost:5000.

### 5. Connect Multiple Devices
Ensure that all devices are connected to the same Wi-Fi network. Use the local IP address of the backend server to connect if running on different devices within your home network.

For example, if the backend server is running on a machine with IP address 192.168.1.100, you can replace localhost in the frontend code:
```js
const socket = io('http://192.168.1.100:5000'); // Use your local IP address
```

### 6. Start Chatting
Once the app is running on multiple devices, you can start sending and receiving messages. Messages will be displayed for 5 minutes and then automatically disappear.

## 🔒 Security Considerations
Since this app is designed for local, in-house use only, it does not implement advanced security features like message encryption or SSL. However, if you want to deploy the app outside your home network, you can consider adding encryption (e.g., using TLS/SSL for WebSocket) to ensure secure transmission of messages.

## 🏅 Future Improvements
- **User Authentication:** Implement login and registration to restrict access to the chat app.
- **Message Encryption:** Add encryption to secure messages in transit.

## 📄 License
This project is open-source and available under the MIT License.
