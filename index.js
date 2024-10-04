const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const socketController = require('./controllers/socketController');

const roomRoutes = require('./routes/route.js');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors());

app.use('/', roomRoutes);

io.on('connection', socketController.handleConnection);

server.listen(3000, () => {
  console.log("Server running on port 3000!");
});
