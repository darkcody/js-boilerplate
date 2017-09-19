import 'whatwg-fetch';
import config from '../../app.config';

export function getContent(types) {
  types = Array.isArray(types) ? types : [types];
  let resources = Object.keys(config.resourcePaths).filter((resource) => {
    return types.includes(resource) || !types.length;
  });
  let contentPromises = [];
  resources.forEach((resource) => {
    contentPromises.push(get(resource));
  });
  return Promise.all(contentPromises);
}

function get(resource, id) {
  let uri = '/api' + config.resourcePaths[resource];
  if (id) {
    uri += `/${id}`;
  }
  return fetch(uri).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

export function updateContentLists(data, dataType) {
  if (!data.data || !Object.keys(config.resourcePaths).includes(dataType)) {
    return;
  }

  global.document.getElementById(`${dataType}API`).innerHTML = '<h4>API Data from: ' + config.baseUrl + config.apiPrefix + config.resourcePaths[dataType];
  global.document.getElementById(`${dataType}API`).innerHTML += `</h4><table><tbody id="${dataType}ContentList"></tbody></table>`;

  let body = tableHeader(dataType);
  data.data.forEach(datum => {
    body += tableRow(datum, dataType);
  });

  global.document.getElementById(`${dataType}ContentList`).innerHTML = body;

}

function tableHeader(type) {
  let row = '<thead>';
  row += '<tr><th>ID</th>';
  switch (type) {
    case 'user':
      row += '<th>User Name</th>';
      row += '<th>Email</th>';
      break;
    case 'page':
      row += '<th>NID</th>';
      row += '<th>Title</th>';
      row += '<th>Created</th>';
      row += '<th>Changed</th>';
      break;
  }
  row += '</tr></thead>';
  return row;
}

function tableRow(data, type) {
  let attributes;

  switch (type) {
    case 'user':
      attributes = ['name', 'mail'];
      break;
    case 'page':
      attributes = ['nid', 'title', 'created', 'changed'];
  }

  let row = `<tr><td>${data.id}</td>`;
  attributes.forEach(attr => {
    row += `<td>${data.attributes[attr]}</td>`;
  });
  row += '</tr>';

  return row;
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
