/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import {
  schema
} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

const json = jsf(schema); // JSON.stringify()

// Converting to JSON API specs 
var json_nested = json.users;
var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var UserSerializer = new JSONAPISerializer('users', {
  attributes: ['id', 'firstName', 'lastName', 'email']
});

var users = UserSerializer.serialize(json_nested);
var stringify_users = JSON.stringify(users);

fs.writeFile("./src/api/db.json", stringify_users, function (err) {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated."));
  }
});
