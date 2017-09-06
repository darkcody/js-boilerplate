import 'whatwg-fetch';
import {
  environment
} from '../../buildScripts/envDetect.js';

const baseUrl = (environment === 'development') ? 'http://localhost:4201/users' : 'http://beta.json-generator.com/api/json/get/4yJfmmFKm';

export function getUsers() {
  return get('users');
}

function deleteUser(id) {
  return del(`/${id}`);
}

function get() {
  return fetch(baseUrl).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });
  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

export function populateAPIDOM(result) {

  global.document.getElementById('userAPI').innerHTML = '<h4>API Data from: ' + baseUrl;
  global.document.getElementById('userAPI').innerHTML += '</h4><table><tbody id="users"></tbody></table>';

  let usersBody = "";
  let deleteOption = (environment !== 'development') ? 'style="display:none;"' : '';

  result.forEach(user => {
    usersBody += `<tr>
        <td>${user.id}</td>
        <td>${user.attributes['first-name']}</td>
        <td>${user.attributes['last-name']}</td>
        <td>${user.attributes.email}</td>
        <td ${deleteOption}><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        </tr>`
  });

  global.document.getElementById('users').innerHTML = usersBody;

}

export function removeAPIUsers(deleteLinks) {
  Array.from(deleteLinks, link => {
    link.onclick = function (event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
}



function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
