import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
  return get('users');
}

function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
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

  global.document.getElementById('userAPI').innerHTML = '<h4>API Data from: ' + baseUrl + 'users' ;
  global.document.getElementById('userAPI').innerHTML += '</h4><table><tbody id="users"></tbody></table>';

  let usersBody = "";
  result.forEach(user => {
    usersBody += `<tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
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
