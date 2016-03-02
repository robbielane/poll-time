const express    = require('express');
const http       = require('http');
const path       = require('path');
const bodyParser = require('body-parser');
const socketIo   = require('socket.io');
const app        = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.emit('statusMessage', 'You are connected!');
});
