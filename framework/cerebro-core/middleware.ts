import * as express from 'express';

export default abstract class Middleware
{
    public abstract run(req: express.Request, res: express.Response, next: any): void;
}