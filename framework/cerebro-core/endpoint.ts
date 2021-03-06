import Application from "./application";
import Behaviour from "./behaviour";
import Logger from 'cerebro-logger';
import StatusCode from 'cerebro-status';

export enum Method
{
    DELETE = 'DELETE',
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

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
    public register(router: any): void
    {
        console.assert(this._url != null, `Invalid URL for the ${this.name} endpoint`);
        switch (this._method)
        {
            case Method.POST:
                router.post(this._url, this.bind('execute'));
                break;
            case Method.DELETE:
                router.delete(this._url, this.bind('execute'));
                break;
            case Method.PUT:
                router.put(this._url, this.bind('execute'));
                break;
            case Method.GET:
            default:
                router.get(this._url, this.bind('execute'));
                break;
        }
    }

    private async execute(req, res): Promise<void>
    {
        Logger.log(
            `[${Logger.Color.decorate(this.name, Logger.Color.Foreground.Blue)}` +
            `(${Logger.Color.decorate(this._method, Logger.Color.Foreground.Cyan)}` +
            `:${Logger.Color.decorate(this._url, Logger.Color.Foreground.Magenta)})]`,
            'Endpoint');

        // let request = this._method == Method.POST
        //     ? req.body
        //     : req.params;
        // 
        // if (!Schema.validate(request, this.requestSchema))
        // {
        //     Logger.warning(`Invalid request. endpoint[${this.constructor.name}] request[${JSON.stringify(request)}]`);
        //     return res.respond(Status.Code.BadRequest, Status.toString(Status.Code.BadRequest));
        // }
        // 
        // request.raw = req;
        // const response = Schema.generate(this.responseSchema);
        // const status = await this.serve(request, response);
        // res.respond(status, { response });

        const code: StatusCode = await this.serve(this._request, this._response);
        res.send();
    }

    protected abstract async serve(request: RequestType, response: ResponseType): Promise<StatusCode>;
}