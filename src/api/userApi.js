import 'whatwg-fetch';
import config from '../../app.config';

export function getUsers(id) {
  return get('user', id);
}

function deleteUser(id) {
  return del(`/${id}`);
}

function get(resource, id) {
  let uri = '/api' + config.resourcePaths[resource];
  if (id) {
    uri += `/${id}`;
  }
  return fetch(uri).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(config.baseUrl + url, {
    method: 'DELETE'
  });
  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

export function populateAPIDOM(result) {

  global.document.getElementById('userAPI').innerHTML = '<h4>API Data from: ' + config.baseUrl;
  global.document.getElementById('userAPI').innerHTML += '</h4><table><tbody id="users"></tbody></table>';

  let usersBody = "";
  let deleteOption = (config.environment !== 'development') ? 'style="display:none;"' : '';

  result.forEach(user => {
    usersBody += `<tr>
        <td>${user.id}</td>
        <td>${user.attributes['name']}</td>
        <td>${user.attributes.mail}</td>
        <!--<td ${deleteOption}><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>-->
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
