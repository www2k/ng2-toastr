'use strict';

import * as http from 'http';
import {App} from './app';

const expressApp = new App();

http.createServer(expressApp.app).listen('3000');