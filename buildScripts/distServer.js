import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import * as auth from './authenticationController';
import * as proxy from './apiProxyController';

const port = 4200;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Proxy the external API to allow machine-to-machine authentication, per the
// Oauth client credentials grant flow.
app.get('/api/:path(*)', [
  auth.authenticateRequest(),
  proxy.proxyRequest(),
  // @todo: add an error handler
]);

/* eslint-disable no-console */
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
