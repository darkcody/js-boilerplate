import './main.css';

import {
  getContent,
  updateContentLists,
  removeAPIUsers
} from './api/api';

import {
  envToolbar, envDump
} from '../buildScripts/envDetect.js';

// Populate table of users via API call.
let typesToGet = ['user', 'page'];
typesToGet.forEach(type => {
  getContent(type).then(result => {

    // Populate initial API users.
    updateContentLists(result.shift(), type);

    // @todo: this isn't configured to work with the drupal jsonapi.
    // Remove from local faux db.
    // removeAPIUsers(global.document.getElementsByClassName('deleteUser'));
  });
})

// Populate environment toolbar. 
envToolbar();

// Populate environment block. 
envDump();

/**
 * https://jsonplaceholder.typicode.com/posts 
 * https://jsonplaceholder.typicode.com/users 
 */
