import { Application, ApplicationState, Controller, Endpoint, HTTP, Router, Service } from 'cerebro-core';
import Logger from 'cerebro-logger';
import { Server, NetworkProtocol, Client } from 'cerebro-netcore';

class FooController extends Controller
{
    public constructor(app: Application) { super(app); }

    public register(router: Router): void
    {
        router.register('/', HTTP.Method.GET, (req, res) =>
        {
            res.status(HTTP.StatusCode.OK).send("Ciao");
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
        Logger.info("endpoint -> " + request.text);
        response.text = "fffofofofofof";
        return HTTP.StatusCode.OK;
    }
}

/*
const app: Application = new Application();
app.initialize();
app.register(FooController);
app.register(FooService);
app.register(PooService);
app.register(FooEndpoint);
const service: Service = app.service(FooService);
const state: ApplicationState = app.listen(() => {

});
*/

const AuthentiationCommandId: string = 'auth';

class AutheticationRequest
{
    public username: string;
}

const server: Server = new Server(NetworkProtocol.WebSockets);
server.onListening = () =>
{
    const client: Client = new Client(NetworkProtocol.WebSockets);
    client.onConnection = () =>
    {
        const request: AutheticationRequest = new AutheticationRequest;
        request.username = 'Vito';

        client.call(AuthentiationCommandId, request, (data: any) => { 
            console.log(data);
        });

        client.close();
    };

    client.connect('127.0.0.1', 6000);
};
server.listen(6000);