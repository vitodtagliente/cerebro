import { Application, ApplicationState, Controller, Endpoint, HTTP, Router, Service } from 'cerebro-core';
import Logger from 'cerebro-logger';
import { Server, NetworkProtocol, Client, UserSession, Message } from 'cerebro-netcore';
import { NetworkObject, World, Level } from 'cerebro-netgame';
// import { AuthenticationCommand, AuthenticationCommandId, AuthenticationRequest, AuthenticationResponse } from 'cerebro-netshared';

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

// async function init(client: Client)
// {
//     client.onConnection = async () =>
//     {
//         const request: AuthenticationRequest = new AuthenticationRequest;
//         request.username = 'Vito';
//
//         const response: AuthenticationResponse = await client.call(AuthenticationCommandId, request);
//         console.log(response.foo);
//
//         client.close();
//     };
// }
//
// const server: Server = new Server(NetworkProtocol.WebSockets);
// server.register.add(new AuthenticationCommand);
// server.onListening = async () =>
// {
//     const client: Client = new Client(NetworkProtocol.WebSockets);
//     client.register.add(new AuthenticationCommand);
//     init(client);
//     client.connect('127.0.0.1', 6000);
// };
// server.listen(6000);

const world: World = new World;
const MAIN_LEVEL: string = "MAIN_LEVEL";

const server: Server = new Server(NetworkProtocol.WebSockets);
server.onListening = async () =>
{
    const client: Client = new Client(NetworkProtocol.WebSockets);
    client.connect('127.0.0.1', 6000);
};
server.onClientConnection = async (userSession: UserSession) =>
{
    userSession.data.set("level", MAIN_LEVEL);
    const level: Level = world.get(MAIN_LEVEL);
    if (level)
    {
        const object: NetworkObject = level.add();
        if (object)
        {
            userSession.data.set("pawn", object.id);
        }
    }
};
server.onClientMessage = async (userSession: UserSession, message: Message) =>
{

};
server.onClientDisconnection = async (userSession: UserSession) =>
{
    world.get(userSession.data.get("level")).remove(userSession.data.get("pawn"));
};
server.listen(6000);