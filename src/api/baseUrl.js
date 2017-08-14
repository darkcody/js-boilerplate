import { environment } from '../../buildScripts/envDetect.js';
let env = environment;

export default function getBaseUrl() {
  return env === 'development' ? 'http://localhost:4201/' : 'https://mysterious-dawn-16770.herokuapp.com/'; // TODO: update for dev and stage  
}