'use strict';
var express = require('express');
var App = (function () {
    function App() {
        // create express app
        this.app = express();
        // setup static path
        this.app.use('/public', express.static(__dirname + '/public'));
        this.app.use('/app', express.static(__dirname + '/app'));
        this.app.use('/node_modules', express.static(__dirname + '/node_modules'));
        // create express router
        var router = express.Router();
        // define root url to index.html
        router.get('/', function (req, res, next) {
            // res.send('<h1>Hello there</h1>');
            res.sendFile('index.html', { root: __dirname });
        });
        this.app.use(router);
    }
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map