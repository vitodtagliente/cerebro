import * as WS from 'websocket';
import ClientConnection, { ClientConnectionState } from '../client_connection';
import Encoding from '../encoding';
import Message from '../message';
import { NetworkProtocol } from '../network';

enum EventType
{
    Connection = 'connect',
    Disconnection = 'close',
    Error = 'error',
    Message = 'message'
}

export default class ClientConnectionWS extends ClientConnection
{
    private _socket: WS.connection = null;

    public constructor()
    {
        super(NetworkProtocol.WebSockets);
    }

    public connect(address: string, port: number): void 
    {
        if (this.state != ClientConnectionState.Initialized)
        {
            return;
        }

        const endpoint: string = `ws://${address}:${port}`;
        const client: WS.client = new WS.client();

        client.on(EventType.Connection, (connection: WS.connection) =>
        {
            this._state = ClientConnectionState.Connected;
            this._socket = connection;
            console.log(`Connected to the host: ${endpoint}`);
            this.onConnection();

            connection.on(EventType.Error, (error: Error) =>
            {
                console.log("Connection Error: " + error.toString());
            });
            connection.on(EventType.Disconnection, () =>
            {
                this._state = ClientConnectionState.Closed;
                console.log(`Connection closed!`);
                this.onDisconnection();
            });
            connection.on(EventType.Message, (message: WS.Message) =>
            {
                if (message.type === 'utf8')
                {
                    const decodedMessage: string = Encoding.decode(message.utf8Data);
                    this.onMessage(decodedMessage)
                }
            });
        });

        client.connect(endpoint, 'cerebro');
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
            this._socket.sendUTF(data);
        }
    }
}