'use strict'

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const socketIo   = require('socket.io');
const Firebase   = require('firebase');
const schedule   = require('node-schedule');

const app        = express();
const port       = process.env.PORT || 3000;
var polls        = {};
const FireRef    = new Firebase("https://poll-time.firebaseio.com/");

FireRef.on('value', (snapshot) => { polls = snapshot.val(); });

app.set('port', port);
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

var server;

if (!module.parent) {
  server = app.listen(port, () => {
   console.log(`listening on *:${port}`);
 });
}

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('newPoll', (pollId, pollData) => {
    polls[pollId] = pollData;
    FireRef.child(pollId).set(polls[pollId]);
    if (pollData.end) {
      schedule.scheduleJob(pollData.end, () => {
        polls[pollId].active = false;
        FireRef.child(pollId).set(polls[pollId]);
        io.sockets.emit('pollData', polls[pollId], pollId);
      });
    }
  });

  socket.on('pollRequest', (pollId) => {
    socket.emit('pollData', polls[pollId], pollId);
  });

  socket.on('vote', (vote, pollId) => {
    polls[pollId].responses[vote]++;
    FireRef.child(pollId).set(polls[pollId]);
    io.sockets.emit('pollData', polls[pollId], pollId);
  });

  socket.on('endPoll', (pollId) => {
    polls[pollId].active = false;
    FireRef.child(pollId).set(polls[pollId]);
    io.sockets.emit('pollData', polls[pollId], pollId);
  });
});

module.exports = app;
