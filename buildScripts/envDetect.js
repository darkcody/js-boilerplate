export const environment = process.env.NODE_ENV;

export function envToolbar() {

  let color = '';

  if (environment === 'development') {
    color = "#e0f0f9"
  } else {
    color = "#d7f4d2"
  }

  let markup = '<div style="background-color:' + color + ';"> environment :: ' + environment + ' </div>'
  global.document.getElementById('env-toolbar').innerHTML = markup;

}

export function envDump() {

  let env_values = '';
  for (let [k, v] of Object.entries(process.env)) {
    if (typeof k !== 'undefined' && typeof v !== 'undefined') {
      env_values += '<div>' + JSON.stringify(k) + ': ' + JSON.stringify(v) + '</div>';
    }
  }

  global.document.getElementById('envDump').innerHTML = '<span id="expand-dump">Expand Environment Info </span>';
  global.document.getElementById('envDump').innerHTML += '<div id="env-expand">' + env_values + '</div>';

  let click = document.getElementById("expand-dump"),
    env_expand = document.getElementById("env-expand");

  env_expand.style.display = 'none'; // onload 

  click.addEventListener("click", function () {
    if (env_expand.style.display == 'none') {
      env_expand.style.display = 'block';
    } else {
      env_expand.style.display = 'none';
    }
  }, false);

}
