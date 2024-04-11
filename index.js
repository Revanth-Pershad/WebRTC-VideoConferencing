import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import registerSocketRoutes from './sockets/index.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();
const PORT = process.env.PORT || 3000;

registerSocketRoutes(io);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Server</h1>');
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});