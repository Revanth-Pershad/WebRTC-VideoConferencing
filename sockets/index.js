function registerSocketRoutes(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    let currentRoomId = null;
    let currentUserName = null;

    socket.on('join-room', ({ userName, roomId }) => {
      if (!roomId) {
        roomId = nanoid(); // Generate a new room ID if not provided
      }
      currentRoomId = roomId; // Store the current room ID for later use
      currentUserName = userName; // Store the current user's name for later use
      socket.join(roomId);
      console.log(`${userName} joined room: ${roomId}`);
      socket.to(roomId).broadcast.emit('user-joined', userName);
      socket.emit('room-joined', roomId);
    });

    socket.on('leave-room', ({ userName, roomId }) => {
      socket.leave(roomId);
      console.log(`${userName} left room: ${roomId}`);
      socket.to(roomId).broadcast.emit('user-left', userName);
      currentRoomId = null;
      currentUserName = null;
    });

    socket.on('chat-message', ({ userName, message, roomId }) => {
      socket.to(roomId).broadcast.emit('chat-message', { userName, message });
      console.log(`Message from ${userName} in ${roomId}: ${message}`);
    });

    socket.on('stop-my-video', ({ userName, roomId }) => {
      socket.to(roomId).broadcast.emit('video-stopped', userName);
      console.log(`${userName} stopped their video in ${roomId}`);
    });

    // Handling WebRTC signaling
    socket.on('webrtc-offer', ({ to, offer }) => {
      console.log(`Sending offer from ${socket.id} to ${to}`);
      socket.to(to).emit('webrtc-offer', { from: socket.id, offer });
    });

    socket.on('webrtc-answer', ({ to, answer }) => {
      console.log(`Sending answer from ${socket.id} to ${to}`);
      socket.to(to).emit('webrtc-answer', { from: socket.id, answer });
    });

    socket.on('webrtc-ice-candidate', ({ to, candidate }) => {
      console.log(`Sending ICE candidate from ${socket.id} to ${to}`);
      socket.to(to).emit('webrtc-ice-candidate', { from: socket.id, candidate });
    });

    socket.on('disconnect', () => {
      console.log(`${currentUserName || 'A user'} disconnected`);
      if (currentRoomId && currentUserName) {
        socket.to(currentRoomId).broadcast.emit('user-left', currentUserName);
      }
    });
  });
}
export default registerSocketRoutes;
