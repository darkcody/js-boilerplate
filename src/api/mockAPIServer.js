import jsonServer from 'json-server';
import {Serializer as JSONAPISerializer} from 'jsonapi-serializer';

let UserSerializer = new JSONAPISerializer('users', {
  attributes: ['firstName', 'lastName', 'email']
});

let router = jsonServer.router('src/api/db.json');

router.render = (req, res) => {
  let data = res.locals.data;

  if (req.path.includes('/users') && data) {
    res.json(UserSerializer.serialize(data));
  }

}

jsonServer
  .create()
  .use(jsonServer.defaults())
  .use(router)
  .listen(4201, function () {
    console.log('Mock API Server is running.');
  });
