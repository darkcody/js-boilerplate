import {
  environment
} from './buildScripts/envDetect.js';
// const baseUrl = (environment === 'development') ? 'http://localhost:4201/users' : 'http://beta.json-generator.com/api/json/get/4yJfmmFKm';
const baseUrl = 'http://headlessnightlyth3vcdx4ci.devcloud.acquia-sites.com';

export default {
  environment: environment,
  baseUrl: baseUrl,
  apiPrefix: '/jsonapi',
  resourcePaths: {
    user: '/user/user',
    page: '/node/page'
  }
}
