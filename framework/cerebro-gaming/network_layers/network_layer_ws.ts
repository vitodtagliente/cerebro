import * as WS from 'ws';
import Logger from 'cerebro-logger';
import NetworkLayer, { NetworkState, NetworkType, SocketId } from '../network_layer';
import Encoding from '../encoding';
import { nextNetworkId } from '../network_id';

enum EventType
{
    Connection = 'connection',
    Disconnection = 'disconnection',
    Error = 'error',
    Listening = 'listening',
    Message = 'message'
}

export default class NetworkLayerWS extends NetworkLayer
{
    private _socket: WS.Server = null;
    private _clients: Map<SocketId, WS>;

    public constructor()
    {
        super(NetworkType.WebSockets);
        this._clients = new Map<SocketId, WS>();
    }

    public listen(port: number): void 
    {
        if (this.state != NetworkState.Initialized)
        {
            return;
        }

        this._socket = new WS.Server({ port });

        this._state = NetworkState.Listening;
        Logger.info(`Game Server listening at ${Logger.Color.decorate(this._socket.address().toString(), Logger.Color.Foreground.Magenta)}...`);
        this.onListening();

        this._socket.on(EventType.Error, (error: Error) =>
        {
            this._state = NetworkState.Error;

            Logger.error(`Fatal error, closing the socket...`);
            this._socket.close();

            console.log(error.stack);
            this.onError(error);
        });
        this._socket.on(EventType.Connection, (socket: WS) =>
        {
            const socketId: SocketId = nextNetworkId();
            this._clients.set(socketId, socket);

            this.onClientConnection(socketId);

            socket.on(EventType.Disconnection, () =>
            {
                this._clients.delete(socketId);
                this.onClientDisconnection(socketId);
            });

            socket.on(EventType.Message, (message: string) =>
            {
                const decodedMessage: string = Encoding.decode(message);
                this.onClientMessage(socketId, decodedMessage);
            });
        });
    }
}