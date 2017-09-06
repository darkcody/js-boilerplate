import './main.css';

import {
  getUsers,
  populateAPIDOM,
  removeAPIUsers
} from './api/userApi';

import {
  envToolbar, envDump
} from '../buildScripts/envDetect.js';

// Populate table of users via API call.
getUsers().then(result => {

  // Populate initial API users.
  populateAPIDOM(result.data);

  // Remove from local faux db.
  removeAPIUsers(global.document.getElementsByClassName('deleteUser'));

});

// Populate environment toolbar. 
envToolbar();

// Populate environment block. 
envDump();

/**
 * https://jsonplaceholder.typicode.com/posts 
 * https://jsonplaceholder.typicode.com/users 
 */
