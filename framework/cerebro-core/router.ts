import * as express from 'express';
import { Method } from 'cerebro-http';
import { assert } from 'console';

export default class Router
{
    /// The express application
    private _context: express.Application;

    /**
     * Constructor
     * @param context The express application
     */
    public constructor(context: express.Application)
    {
        this._context = context;
    }

    /**
     * Register a new route
     * @param name The name of the route
     * @param method The method or the route
     * @param callback The callback of the route
     */
    public register(name: string, method: Method, callback: any)
    {
        switch (method)
        {
            case Method.DELETE:
                this._context.delete(name, callback);
                break;
            case Method.HEAD:
                this._context.head(name, callback);
                break;
            case Method.PATCH:
                this._context.patch(name, callback);
                break;
            case Method.POST:
                this._context.post(name, callback);
                break;
            case Method.PUT:
                this._context.put(name, callback);
                break;
            case Method.GET:
                this._context.get(name, callback);
                break;
            default:
                assert(false, `Unsupported method ${method}`);
                break;
        }
    }
}