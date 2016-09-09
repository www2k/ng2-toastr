import * as express from 'express';

export class RobotController {

  greets(req: express.Request, res: express.Response, next: express.NextFunction) {
    let name: string = req.query.name || 'there';

    res.send(`<h3> hello ${name} </h3>`);
  }

}