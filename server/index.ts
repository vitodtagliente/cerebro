import { Application, Controller, Endpoint, HTTP, Log, Router, Service } from "cerebro-core";

class FooController extends Controller
{
    public constructor(app: Application) { super(app); }

    public register(router: Router): void
    {
        router.register('/', HTTP.Method.GET, (req, res) =>
        {
            res.status(HTTP.StatusCode.OK).send("Hello World");
        });
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
        super(app, "/foo", HTTP.Method.GET, {}, {});
    }

    protected async serve(request: FooRequest, response: FooResponse): Promise<HTTP.StatusCode>
    {
        Log.Logger.info("endpoint -> " + request.text);
        response.text = "fffofofofofof";
        return HTTP.StatusCode.OK;
    }
}

const app: Application = new Application();
app.initialize();
app.register(FooController);
app.register(FooService);
app.register(PooService);
app.register(FooEndpoint);
app.listen(() => {

});