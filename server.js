const express = require('express');
const path = require('path');
const Twit = require('twit');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const configErrorExit = (error) => {
  console.err(`[Config Error] - ${error}`);
  exit(1);
}

const consumerKey = process.env.TWITTER_API_KEY || configErrorExit('TWITTER_API_KEY not set');
const consumerSecret = process.env.TWITTER_API_SECRET ||configErrorExit('TWITTER_API_SECRET not set');
const accessToken = process.env.TWITTER_ACCESS_TOKEN || configErrorExit('TWITTER_ACCESS_TOKEN not set');
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET || configErrorExit('TWITTER_ACCESS_TOKEN_SECRET not set');

const T = new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/ping', function (req, res) {
  console.log('ping');
 return res.send('{message: "pong"}');
});

app.get('/api/tweet-search', (req, res) => {
  T.get('search/tweets', { q: req.query.q, count: req.query.count }, function(err, data) {
    if(err) {
      return res.status(400).send({status: 400, error: 'Bad Request', errorMessage: err});
    }
    return res.send(data);
  })

}); 


app.listen(process.env.PORT || 8080);


