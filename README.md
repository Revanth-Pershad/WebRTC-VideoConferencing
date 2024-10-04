# WebRTC Video Conferencing Application

- This is a simple, secure video conferencing application built using WebRTC, Express, and Socket.io. The application leverages the WebRTC protocol for peer-to-peer video and audio communication, ensuring that video streams are never sent to the server, maintaining complete privacy. The app is designed to continue communication even if the server goes down, thanks to WebRTC's direct peer-to-peer connection.

https://github.com/user-attachments/assets/b7627ce2-d3da-4f53-93da-fa344d322c19

## Features

### 1. **Peer-to-Peer Communication**
   - The application uses the WebRTC protocol to establish direct peer-to-peer (P2P) communication between users.
   - Video, audio, and data streams never pass through the server, ensuring complete privacy and security.

### 2. **Continued Communication Even if Server Crashes**
   - Once the WebRTC connection is established, the communication between peers can continue even if the signaling server crashes or becomes unavailable.

### 3. **Unique Room Creation**
   - Users can create unique video conferencing rooms that can be shared with others using a unique URL.

### 4. **Real-time User Connection**
   - New users are notified in real-time when they join or leave the room, and their video streams are displayed dynamically in the grid.

### 5. **Dynamic Grid Layout**
   - The video grid layout automatically adjusts based on the number of participants in the room, ensuring a seamless and responsive user experience.

### 6. **PeerJS Server for Signaling**
   - We use **PeerJS** to share WebRTC candidate information (SDP and ICE candidates) between peers, enabling connection setup.
   - PeerJS provides an easy-to-use signaling mechanism, simplifying the process of setting up and managing WebRTC connections.

### 7. **Cross-Browser Compatibility**
   - Supports most modern browsers, including Chrome, Firefox, Safari, and Edge.

## Technologies Used

- **WebRTC**: For real-time peer-to-peer communication of audio, video, and data.
- **PeerJS**: Simplifies the signaling process for WebRTC by sharing SDP and ICE candidates between peers.
- **Express.js**: A lightweight framework to handle routing and serve the client-side application.
- **Socket.io**: Used for signaling and establishing WebRTC connections between peers.
- **EJS**: Embedded JavaScript templating to render dynamic HTML views.
- **UUID**: Used to generate unique room IDs.

## How It Works

1. When a user visits the homepage, they can create a new video conferencing room by clicking a button. A unique room URL is generated using the `uuid` package and the user is redirected to that room.
   
2. Other users can join the room by navigating to the unique room URL. Once they join, the application establishes a WebRTC connection between all peers in the room.

3. We use **PeerJS** to exchange signaling data, such as SDP (Session Description Protocol) and ICE (Interactive Connectivity Establishment) candidates, between peers to establish a WebRTC connection.

4. Once the WebRTC connection is established, video and audio streams are shared directly between peers, never passing through the server.

5. If the server crashes or restarts, the established WebRTC connections between peers will remain active, and users can continue their video chat without interruption.

## Installation and Setup

To run the application locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Revanth-Pershad/WebRTC-VideoConferencing.git
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```
3. **Run the Node Server**

   ```bash
   node index.js
   ```
4. **Website is Started on Port 3000:**

   - Visit localhost:3000 to use the application locally.
  
## Known Issues and Limitations
  - Peer Limit: Depending on network conditions, WebRTC performance can degrade with a large number of participants in a room.
  - Server Crash: While peer communication continues even if the server crashes, new users won’t be able to join until the server restarts.


  

