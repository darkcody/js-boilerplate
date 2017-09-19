import oauth2 from 'simple-oauth2';
import env from 'node-env-file';
import path from 'path';
import config from '../app.config';

env(path.join(__dirname, '../.env'), {raise: false});

const oauthClient = getClient();
const tokenConfig = getTokenConfig();
let token = null;

function getClient() {
  let credentials = {
    client: {
      id: process.env.OAUTH_CLIENT_ID,
      secret: process.env.OAUTH_CLIENT_SECRET,
    },
    auth: {
      tokenHost: config.baseUrl
    }
  }

  return oauth2.create(credentials);
}

function getTokenConfig() {
  return {
    username: process.env.OAUTH_USER,
    password: process.env.OAUTH_PASSWORD,
  }
}

function getToken() {
  if (token && !token.expired()) {
    return new Promise((resolve) => {
      resolve(token);
    });
  }

  // @todo: token.refresh() didn't work for my expired token. Need to configure
  // oauth refresh endpoint? Does refresh need to be called before the token
  // expires?

  // if (token && token.expired()) {
  //   return token.refresh().then((result) => {
  //     token = result;
  //     return token;
  //   });
  // }


  return oauthClient.ownerPassword
    .getToken(tokenConfig)
    .then((result) => {
      token = oauthClient.accessToken.create(result);
      return token;
    })
    .catch((err) => {
      // @todo: handle auth error.
      token = null;
      throw new Error(err);
    });
}

/**
 * Authentication middleware.
 *
 * Ensures we have a valid token from the oauth authority, and attaches the
 * bearer header to the request.
 */
export function authenticateRequest() {
  return (req, res, next) => {
    getToken().then((token) => {
      req.headers['Authorization'] = `Bearer ${token.token.access_token}`;
      next();
    }).catch((err) => {
      next(err);
    });
  }
}
