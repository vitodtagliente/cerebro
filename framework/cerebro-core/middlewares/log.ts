import Middleware from '../middleware';
import Logger from 'cerebro-logger';

export default class LogMiddleware extends Middleware
{
    public run(req: Express.Request, res: Express.Response, next: any): void
    {
        Logger.request(req, false);
        next();
    }
}