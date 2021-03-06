import { Application, ApplicationState, Controller, Endpoint, Method, Service, StatusCode } from 'cerebro-core';
import Logger from 'cerebro-logger';

class FooController extends Controller
{
    public constructor(app: Application) { super(app); }

    public register(router): void
    {
        Logger.log("foo");
    }
}

class FooService extends Service
{
    public constructor(app: Application) { super(app); }
}

class PooService extends Service
{
    public constructor(app: Application) { super(app); }
}

interface FooRequest
{
    text?: string;
    description?: string;
}

interface FooResponse
{
    text?: string;
}

class FooEndpoint extends Endpoint<FooRequest, FooResponse>
{
    public constructor(app: Application)
    {
        super(app, "/foo", Method.GET, {}, {});
    }

    protected async serve(request: FooRequest, response: FooResponse): Promise<StatusCode>
    {
        Logger.log("endpoint -> " + request.text);
        response.text = "fffofofofofof";
        return StatusCode.OK;
    }
}

const app: Application = new Application();
app.initialize();
app.register(FooController);
app.register(FooService);
app.register(PooService);
app.register(FooEndpoint);
const service: Service = app.service(FooService);
const state: ApplicationState = app.listen(() =>
{

});