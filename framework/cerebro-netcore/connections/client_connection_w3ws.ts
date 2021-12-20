import * as WS from 'websocket';
import ClientConnection, { ClientConnectionState } from '../client_connection';
import Encoding from '../encoding';
import Message from '../message';
import { NetworkProtocol } from '../network';

export default class ClientConnectionW3WS extends ClientConnection
{
    private _socket: WS.w3cwebsocket = null;

    public constructor()
    {
        super(NetworkProtocol.W3CWebSocket);
    }

    public connect(address: string, port: number): void 
    {
        if (this.state != ClientConnectionState.Initialized)
        {
            return;
        }

        const endpoint: string = `ws://${address}:${port}`;
        this._socket = new WS.w3cwebsocket(endpoint, 'cerebro');

        this._socket.onopen = () =>
        {
            this._state = ClientConnectionState.Connected;
            console.log(`Connected to the host: ${endpoint}`);
            this.onConnection();
        };
        this._socket.onmessage = (message: WS.IMessageEvent) =>
        {
            const decodedMessage: string = Encoding.decode(message.data as string);
            this.onMessage(decodedMessage)
        };
        this._socket.onerror = (error: Error) =>
        {
            console.log("Connection Error: " + error.toString());
        };
        this._socket.onclose = () =>
        {
            this._state = ClientConnectionState.Closed;
            console.log(`Connection closed!`);
            this.onDisconnection();
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