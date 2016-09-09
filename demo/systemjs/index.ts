'use strict';

import * as http from 'http';
import {App} from './app';

const expressApp = new App();
const port = 3000;

http.createServer(expressApp.app).listen(port, () => {
  console.log(`Demo app is running at http://localhost:${port}`);
});