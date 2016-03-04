'use strict'

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const socketIo   = require('socket.io');
const app        = express();
const polls      = {};

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/new-poll', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/polls/:id', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/polls/:id/admin', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('newPoll', (pollId, responses) => {
    polls[pollId] = responses;
    console.log(polls);
  });

  socket.on('pollRequest', (pollId) => {
    socket.emit('pollData', polls[pollId]);
  })

  socket.on('vote', (vote, pollId) => {
    polls[pollId].responses[vote]++;
    io.sockets.emit('pollData', polls[pollId]);
    console.log(polls);
  });

  socket.emit('statusMessage', 'You are connected!');
});
