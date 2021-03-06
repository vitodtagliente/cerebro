import * as express from 'express';

export default abstract class Middleware
{
    public abstract run(req: Express.Request, res: Express.Response, next: any): void;
}