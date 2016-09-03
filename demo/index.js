'use strict';
var http = require('http');
var app_1 = require('./app');
var expressApp = new app_1.App();
http.createServer(expressApp.app).listen('3000');
//# sourceMappingURL=index.js.map