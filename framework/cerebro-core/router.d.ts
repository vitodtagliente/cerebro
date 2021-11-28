import * as express from 'express';
import { Method } from 'cerebro-http';
export default class Router {
    private _context;
    /**
     * Constructor
     * @param context The express application
     */
    constructor(context: express.Application);
    /**
     * Register a new route
     * @param name The name of the route
     * @param method The method or the route
     * @param callback The callback of the route
     */
    register(name: string, method: Method, callback: any): void;
}
