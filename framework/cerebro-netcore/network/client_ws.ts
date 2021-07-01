import * as WS from 'ws';
import Client, { ClientState } from '../client';
import Encoding from '../encoding';
import { NetworkProtocol } from '../network';

enum EventType
{
    Connection = 'open',
    Disconnection = 'close',
    Message = 'message'
}

export default class ClientWS extends Client
{
    private _socket: WS = null;

    public constructor()
    {
        super(NetworkProtocol.WebSockets);
    }

    public connect(address: string, port: number): void 
    {
        if (this.state != ClientState.Initialized)
        {
            return;
        }

        const endpoint: string = `ws://${address}:${port}`;
        this._socket = new WS(endpoint);

        this._socket.on(EventType.Connection, () =>
        {
            this._state = ClientState.Connected;
            console.log(`Connected to the host: ${endpoint}`);
            this.onConnection();
        });
        this._socket.on(EventType.Disconnection, () =>
        {
            this._state = ClientState.Closed;
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
        if (this._socket && this._state == ClientState.Connected)
        {
            console.log(`Closing the connection...`);
            this._socket.close();
            this._state = ClientState.Closed;
        }
    }

    public send(message: any): void
    {
        if (this._socket && this._state == ClientState.Connected)
        {
            this._socket.send(message);
        }
    }
}