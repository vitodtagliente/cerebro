import { Application, ApplicationState, Controller, Endpoint, HTTP, Router, Service } from 'cerebro-core';
import Logger from 'cerebro-logger';
import { Server, NetworkProtocol, Client, UserSession, Message } from 'cerebro-netcore';
import { GameClient, GameServer, NetworkMath } from 'cerebro-netgame';
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
// server.commands.add(new AuthenticationCommand);
// server.onListening = async () =>
// {
//     const client: Client = new Client(NetworkProtocol.WebSockets);
//     client.register.add(new AuthenticationCommand);
//     init(client);
//     client.connect('127.0.0.1', 6000);
// };
// server.listen(6000);

const server: Server = new Server(NetworkProtocol.WebSocket);
server.components.add(new GameServer(server));
server.onListening = async () =>
{
    const testClients: number = 0;
    for (let i: number = 0; i < testClients; ++i)
    {
        const client: Client = new Client(NetworkProtocol.WebSocket);
        client.components.add(new GameClient(client));
        client.onConnection = async () =>
        {
            const game: GameClient = client.components.find("game") as GameClient;
            let transform: NetworkMath.Transform = new NetworkMath.Transform;
            transform.position.x = 6;
            game.move(transform);
        };
        client.connect('localhost', 8080);
    }
};
server.listen(8080);