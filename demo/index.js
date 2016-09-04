'use strict';
var http = require('http');
var app_1 = require('./app');
var expressApp = new app_1.App();
var port = 3000;
http.createServer(expressApp.app).listen(port, function () {
    console.log("Demo app is running at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map