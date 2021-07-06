import * as WS from 'ws';
import ClientConnection, { ClientConnectionState } from '../client_connection';
import Encoding from '../encoding';
import Message from '../message';
import { NetworkProtocol } from '../network';

enum EventType
{
    Connection = 'open',
    Disconnection = 'close',
    Message = 'message'
}

export default class ClientConnectionWS extends ClientConnection
{
    private _socket: WS = null;

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
        this._socket = new WS(endpoint);

        this._socket.on(EventType.Connection, () =>
        {
            this._state = ClientConnectionState.Connected;
            console.log(`Connected to the host: ${endpoint}`);
            this.onConnection();
        });
        this._socket.on(EventType.Disconnection, () =>
        {
            this._state = ClientConnectionState.Closed;
            console.log(`Connection closed!`);
            this.onDisconnection();
        });
        this._socket.on(EventType.Message, (message: string) =>
        {
            const decodedMessage: string = Encoding.decode(message);
            this.onMessage(decodedMessage)
        });
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
            if (typeof message === typeof Message)
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