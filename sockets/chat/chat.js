export default (io) => {
    io.on('connection', (socket) => {
        console.log('User connected to chat');

        socket.on('join chat', (roomId) => {
            socket.join(roomId);
            console.log(`User joined chat room: ${roomId}`);
            socket.to(roomId).emit('user joined', `User ${socket.id} has joined the chat`);
        });

        // Listen for when a user wants to leave a chat room
        socket.on('leave chat', (roomId) => {
            socket.leave(roomId);
            console.log(`User left chat room: ${roomId}`);
            socket.to(roomId).emit('user left', `User ${socket.id} has left the chat`);
        });

        // Listen to messages
        socket.on('chat message', (roomId, message) => {
            io.to(roomId).emit('chat message', message);
        });

        // Optionally, handle automatic room leaving on disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
