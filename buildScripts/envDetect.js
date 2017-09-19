export const environment = (process.env.NODE_ENV || '');
export const pipelines_info = (process.env.PIPELINE_ENV || '');

export function envToolbar() {

  let color = (environment === 'development') ? "#e0f0f9" : "#d7f4d2";
  let pipelines_data;

  if (pipelines_info) {
    pipelines_data += " // Pipelines Cloud Site :: " + (process.env.PIPELINE_CLOUD_SITE || 'n/a');
    pipelines_data += " // Pipelines Job ID :: " + (process.env.PIPELINES_JOB_ID || 'n/a');
    pipelines_data += " // Application ID :: " + (process.env.PIPELINES_APPLICATION_ID || 'n/a');

  } else {
    pipelines_data = ' // local build';
  }

  let markup = '<div style="background-color:' + color + ';"> environment :: ' + environment + pipelines_data + ' </div>'
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
