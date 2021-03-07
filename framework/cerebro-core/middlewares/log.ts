import * as express from 'express';
import Middleware from '../middleware';
import Logger from 'cerebro-logger';

export default class LogMiddleware extends Middleware
{
    public run(req: express.Request, res: express.Response, next: any): void
    {
        Logger.request(req, false);
        next();
    }
}