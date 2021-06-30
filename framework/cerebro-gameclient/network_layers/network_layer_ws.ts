import * as WS from 'ws';
import Logger from 'cerebro-logger';
import NetworkLayer, { NetworkState, NetworkType, SocketId } from '../network_layer';
import Encoding from '../encoding';

enum EventType
{
    Connection = 'open',
    Disconnection = 'close',
    Message = 'message'
}

export default class NetworkLayerWS extends NetworkLayer
{
    private _socket: WS = null;

    public constructor()
    {
        super(NetworkType.WebSockets);
    }

    public connect(address: string, port: number): void 
    {
        if (this.state != NetworkState.Initialized)
        {
            return;
        }

        const endpoint: string = `ws://${address}:${port}`;
        this._socket = new WS(endpoint);

        this._socket.on(EventType.Connection, () =>
        {
            this._state = NetworkState.Connected;
            Logger.info(`Connected to the host: ${Logger.Color.decorate(endpoint, Logger.Color.Foreground.Magenta)}`);
            this.onConnection();
        });
        this._socket.on(EventType.Disconnection, () =>
        {
            this._state = NetworkState.Closed;
            Logger.info(`Connection closed!`);
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
        if (this._socket && this._state == NetworkState.Connected)
        {
            Logger.info(`Closing the connection...`);
            this._socket.close();
            this._state = NetworkState.Closed;
        }
    }

    public send(message: any): void
    {
        if (this._socket && this._state == NetworkState.Connected)
        {
            this._socket.send(message);
        }
    }
}