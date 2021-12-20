import { Client, ClientConnection, ClientConnectionState, Encoding, Message, NetworkProtocol, UserSession } from 'cerebro-netcore';
import { GameClient, Level, Math, NetworkObject, World } from 'cerebro-netgame';

enum EventType
{
    Connection = 'open',
    Disconnection = 'close',
    Message = 'message'
}

class W3CConnection extends ClientConnection
{
    private _socket: WebSocket = null;

    public constructor()
    {
        super(NetworkProtocol.WebSockets);
    }

    public connect(address: string, port: number): void 
    {
        const endpoint: string = `ws://${address}:${port}`;
        this._socket = new WebSocket(endpoint);

        this._socket.onopen = (event: Event) =>
        {
            this._state = ClientConnectionState.Connected;
            console.log(`Connected to the host: ${endpoint}`);
            this.onConnection();
        };
        this._socket.onclose = (event: Event) =>
        {
            this._state = ClientConnectionState.Closed;
            console.log(`Connection closed!`);
            this.onDisconnection();
        };
        this._socket.onmessage = (event: MessageEvent) =>
        {
            const message: string = event.data;
            const decodedMessage: string = Encoding.decode(message);
            this.onMessage(decodedMessage)
        };
    }

    public close(): void
    {
        if (this._socket && this._state == ClientConnectionState.Connected)
        {
            console.log(`Closing the connection...`);
            this._socket.close();
            this._state = ClientConnectionState.Closed;
        }
    }

    public send(message: any | Message): void
    {
        if (this._socket && this._state == ClientConnectionState.Connected)
        {
            let data: string;
            if (message instanceof Message)
            {
                const json: string = Encoding.stringify(message);
                const encodedMessage: string = Encoding.encode(json);
                data = encodedMessage;
            }
            else
            {
                data = message;
            }
            this._socket.send(data);
        }
    }
}

window.onload = () =>
{
    const client: Client = new Client(new W3CConnection());
    client.components.add(new GameClient(client));
    client.onConnection = async () =>
    {
        const game: GameClient = client.components.find("game") as GameClient;
        let transform: Math.Transform = new Math.Transform;
        transform.position.x = 6;
        game.move(transform);
    };
    client.connect('127.0.0.1', 6000);
}