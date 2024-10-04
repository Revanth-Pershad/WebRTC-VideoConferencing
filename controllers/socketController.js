exports.handleConnection = (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        
        socket.broadcast.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {

            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });
};