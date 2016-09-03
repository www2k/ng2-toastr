'use strict';

import * as express from 'express';

class App {

  app: express.Application;

  constructor() {
    // create express app
    this.app = express();

    // setup static path
    this.app.use('/public', express.static(__dirname + '/public'));
    this.app.use('/app', express.static(__dirname + '/app'));
    this.app.use('/node_modules', express.static(__dirname + '/node_modules'));

    // create express router
    let router: express.Router = express.Router();

    // define root url to index.html
    router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // res.send('<h1>Hello there</h1>');
      res.sendFile('index.html', {root: __dirname});
    });

    this.app.use(router);
  }

}

export { App };
