'use strict'

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const socketIo   = require('socket.io');
const schedule   = require('node-schedule');
const app        = express();
const polls      = {};

app.set('port', process.env.PORT || 80);
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

const server = app.listen(80, () => {
  console.log('listening on *:80');
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('newPoll', (pollId, pollData) => {
    polls[pollId] = pollData;
    schedule.scheduleJob(pollData.end, () => {
      polls[pollId].active = false;
      io.sockets.emit('pollData', polls[pollId], pollId);
    })
    console.log(polls);
  });

  socket.on('pollRequest', (pollId) => {
    socket.emit('pollData', polls[pollId], pollId);
  })

  socket.on('vote', (vote, pollId) => {
    polls[pollId].responses[vote]++;
    io.sockets.emit('pollData', polls[pollId], pollId);
    console.log(polls);
  });

  socket.on('endPoll', (pollId) => {
    polls[pollId].active = false;
    io.sockets.emit('pollData', polls[pollId], pollId);
  });
});
