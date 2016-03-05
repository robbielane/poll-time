'use strict'

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const socketIo   = require('socket.io');
const schedule   = require('node-schedule');
const BitlyAPI   = require('node-bitlyapi');
const app        = express();
const polls      = {};
const port       = process.env.PORT || 3000;
const Bitly = new BitlyAPI({
	client_id: "76ff36a4056e1ba02c2e36164b69d3d13509cc26",
	client_secret: "a84a2ed390eb4c7db50fb7c08072ec7d831297f2"
});
Bitly.setAccessToken('ad7db05be8568fc71ef1f301da77f9d9a869a7c9');

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

const server = app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('newPoll', (pollId, pollData) => {
    polls[pollId] = pollData;
    if (pollData.end) {
      schedule.scheduleJob(pollData.end, () => {
        polls[pollId].active = false;
        io.sockets.emit('pollData', polls[pollId], pollId);
      });
    }
    console.log(polls);
  });

  socket.on('pollRequest', (pollId) => {
    socket.emit('pollData', polls[pollId], pollId);
  });

  socket.on('vote', (vote, pollId) => {
    polls[pollId].responses[vote]++;
    io.sockets.emit('pollData', polls[pollId], pollId);
    console.log(polls);
  });

  socket.on('shortenUrls', (urls) => {
    Object.keys(urls).forEach( (key) => {
      Bitly.shorten({longUrl: urls[key]}, (err, results) => {
        if (err) {console.log(err)};
        results = JSON.parse(results)
        socket.emit('url', results.data.url, key);
      });
    })

  });

  socket.on('endPoll', (pollId) => {
    polls[pollId].active = false;
    io.sockets.emit('pollData', polls[pollId], pollId);
  });
});

const getBitlyUrl = (url) => {

}
