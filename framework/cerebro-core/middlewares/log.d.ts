import * as express from 'express';
import Middleware from '../middleware';
export default class LogMiddleware extends Middleware {
    run(req: express.Request, res: express.Response, next: any): void;
}
