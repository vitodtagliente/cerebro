import Application from "./application";
import Behaviour from "./behaviour";
import * as express from 'express';
import Logger from 'cerebro-logger';
import { Method, StatusCode } from 'cerebro-http';
import Router from './router';

export default abstract class Endpoint<RequestType, ResponseType> extends Behaviour
{
    /// The url of the endpoint
    private _url: string;
    /// The method
    private _method: Method = Method.GET;
    /// The request
    private _request: RequestType;
    /// The response
    private _response: ResponseType; 

    /**
     * Constructor
     * @param app The application
     */
    public constructor(app: Application, url: string, method: Method = Method.GET, request: RequestType, response: ResponseType)
    {
        super(app);
        this._url = url;
        this._method = method;
        this._request = request;
        this._response = response;
    }

    /**
     * Register the Service
     * @param router The application's router
     */
    public register(router: Router): void
    {
        router.register(this._url, this._method, this.bind('execute'));
    }

    private async execute(req: express.Request, res: express.Response): Promise<void>
    {
        Logger.log(
            `[${Logger.Color.decorate(this.name, Logger.Color.Foreground.Blue)}` +
            `(${Logger.Color.decorate(this._method, Logger.Color.Foreground.Cyan)}` +
            `:${Logger.Color.decorate(this._url, Logger.Color.Foreground.Magenta)})]`,
            'Endpoint');

        this._request = this._method == Method.POST
            ? req.body
            : req.params;
        
        const code: StatusCode = await this.serve(this._request, this._response);
        res.status(code).json(this._response);
    }

    protected abstract async serve(request: RequestType, response: ResponseType): Promise<StatusCode>;
}