## JS Boilerplate for PS

This application is intended as a toolkit for the Node.js hosting platform. It includes a considerable amount of standard build tools and core configuration.  

<!-- v.2 August 31 -->

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### Installing & Development  

- Install [node.js](https://nodejs.org)
- Run `npm install`
- To build the development app: `npm start`
- To build the production app: `npm run build`

#### What will I see when I stand up the application?

If you ran `npm start` for development, you will see:

- A toolbar signifying you built for development 
- The rendered API data from the mock json file
- A link to toggle the variables stored in `process.env` 

If you ran `npm run build` for production, you will see:

- A toolbar signifying you built for production 
- The rendered API data from the external API endpoint
- A link to toggle the variables stored in `process.env` 

![](http://content.screencast.com/users/BedimStudios/folders/Jing/media/d089516e-bfe7-4e80-8df5-88b55bbebc33/00002440.png "")

<br>

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### Features
 
#### Message Logging 

When printing output to the node, the `buildScripts/devMessage.js` file and other build scripts are using both the `chalk` module to format console. messages. Since the linting settings for `.eslintrc.json` is set to warn against console.log, we use the command `/*eslint-disable no-console*/` to skip warnings. 

#### Security 

The npm script for security initiates the `nsp check` from the `nsp` module. This check is included within the `npm start` command to check for security issues as part of the local build. 

#### ES6 Compiling 

Transpiling for ES6 is accomplished with the `babel-node` package. This is then designated by prefixing build scripts with `babel-node` for npm commands. 

#### Sass / CSS 

The npm script `sass` compiles uses the `node-sass` module. The `src/sass` folder contain the sass files. The `main.scss` file serves as the manifest file and contains the imports for the sub-directories.  The final CSS is compiled into the `main.css` files, with Webpack using the dev file `webpack.config.dev.js` to bundle and incorporate the sourcemaps. 

#### Local Server

The npm script `build-dev` initiates the `buildScripts/srcServer.js` which uses `express.js` to create the homepage at `http://localhost:4200`. This script serves as the central location for routing and incorporating other centralized web tasks as well.   

#### Code Linting 

JavaScript code linting is provided by the `eslint-watch` module and is called with the `esw` command and targeted for development or production using the appropriate webpack config: `webpack.config.*`. The development standards are matching according `.eslintrc.json` file. During local dev builds, the linting is watching the core JS pipelines. 

#### Testing

The `Mocha` test framework to target unit testing with `Chai` as the assertion library. The `testSetup.js` build script first sets up initial adjustments by compiling with Babel and skipping CSS validation. The test files are targeted according to the `*.test.js` naming convention, rather than by a specific folder when watching the files. 

#### API Interaction 

Initial mock APIs are included by default and switch based on environment variables. The initial `generate-mock-data` fires the `generateMockData.js` build script. This build script uses the module `json-schema-faker` and the build script `mockDataSchema.js`. A file is then generated to `/src/api/db.json` to emulate as a API call for dev tasks. A new file is created each time `npm start` is ran. Other common operations are included in the `/src/api/` folder, such as deleting records for the development file. The `start-mockapi` tasks then uses the `json-server` module to serve the `localhost:4201/users` endpoint for consumption. For production builds, the API location switches to an external API url to emulate a real API call. 

#### Environment Variables 

For the sake of testing, node processes which are stored in process.env are exposed in runtime by webpack by the `DefinePlugin` value which is exported for switch statements in the DOM. These currently are passed thru the NPM commands as `NODE_ENV=` for development or production.

#### CI Integration

The continuous integration is validated thru TravisCI as part of the normal github workflow. The local storage reference for TravisCI is stored in the `.travis.yml` file.

#### Production Builds

The `npm run build` starts the process of a deployment build. This starts by cleaning `dist/` folder in the `clean-dist` command as part of the `prebuild` command. The subsequent tasks then include `build` and `postbuild` commands which follow the normal methods or compiling thru express and bundled with the production webpack file `webpack.config.prod.js` The webpack settings for production include specific tasks such as bundle splitting, cache bustings, and compression. 





- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


### NPM Commands

This starter-kit utilizes NPM scripts in the packages.json file for workflow items. These scripts run implicit commands from the file, but also reference build scripts located in “buildScripts/”. 

#### `npm start` command sequence for dev

- `prestart` runs creates a dev message to your terminal
- `npm start`  runs in parallel with the code `npm-run-all --parallel` a collection of commands
- `security-check` module security scan for packages
- `build-sass` compiles and watches for sass changes to css 
- `build-dev` fires build tasks with stands up the local website
- `env-detect` utility build tasks for delineating between dev and prod
- `lint:watch` linting by firing `lint` and appends the command with an additional `watch` parameter using `--`  
- `test:watch` - runs tests by firing `test` and appends the command with an additional `watch` parameter using `--`  
- `generate-mock-data` starts process of creating mock data for the API
- `prestart-mockapi` runs `generate-mock-data` as pre-task 
- `start-mockapi` starts the `json-server` and points to the local db.json file


#### `npm run build` command sequence for production

- `clean-dist` clear out existing `/dist` folder 
- `prebuild` preparation tasks around messaging, testing dev code, and linting
- `build` build tasks to prepare deployment code structure
- `postbuild` serving up local assets thru completed codebase 
- `deploy` empty and waiting on TODO


