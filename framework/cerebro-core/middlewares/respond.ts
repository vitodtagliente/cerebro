import Middleware from '../middleware';

export default class Respond extends Middleware
{
    public run(req: Express.Request, res: Express.Response, next: any): void
    {
        /**
        * Inject a new method into the express response
        * Reply with a json response
        * @param status The status code
        * @param data The json data to send
        **/
        // res.respond = (status: number, data: object = {}) =>
        // {
        //     res.status(status).json(data);
        // };
        next();
    }
}