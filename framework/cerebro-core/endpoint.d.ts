import Application from "./application";
import Behaviour from "./behaviour";
import { Method, StatusCode } from 'cerebro-http';
import Router from './router';
export default abstract class Endpoint<RequestType, ResponseType> extends Behaviour {
    private _url;
    private _method;
    private _request;
    private _response;
    /**
     * Constructor
     * @param app The application
     */
    constructor(app: Application, url: string, method: Method, request: RequestType, response: ResponseType);
    /**
     * Register the Service
     * @param router The application's router
     */
    register(router: Router): void;
    private execute;
    protected serve(request: RequestType, response: ResponseType): Promise<StatusCode>;
}
