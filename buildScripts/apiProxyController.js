import requestPromise from 'request-promise';
import config from '../app.config';

export function proxyRequest() {
  return function(req, res, next) {
    let options = {
      uri: config.baseUrl + config.apiPrefix + '/' + req.params.path,
      headers: Object.assign(req.headers, {
        'Content-Type': 'application/vnd.api+json',
        'accept': 'application/vnd.api+json',
        'host': undefined,
      })
    };
    requestPromise(options)
      .then((result) => {
        return JSON.parse(result);
      }).then((parsed) => {
        res.json(parsed);
      })
      .catch((err) => {
        next(err)
      });
  }
}
