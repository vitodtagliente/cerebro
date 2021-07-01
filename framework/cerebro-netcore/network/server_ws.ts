import * as WS from 'ws';
import Encoding from '../encoding';
import { NetworkProtocol, SocketId } from '../network';
import { nextNetworkId } from '../network_id';
import Server, { ServerState } from '../server';

enum EventType
{
    Connection = 'connection',
    Disconnection = 'disconnection',
    Error = 'error',
    Listening = 'listening',
    Message = 'message'
}

export default class ServerWS extends Server
{
    private _socket: WS.Server = null;
    private _clients: Map<SocketId, WS>;

    public constructor()
    {
        super(NetworkProtocol.WebSockets);
        this._clients = new Map<SocketId, WS>();
    }

    public listen(port: number): void 
    {
        if (this.state != ServerState.Initialized)
        {
            return;
        }

        this._socket = new WS.Server({ port });

        this._state = ServerState.Listening;
        console.log(`Game Server listening at ${this._socket.address().toString()}...`);
        this.onListening();

        this._socket.on(EventType.Error, (error: Error) =>
        {
            this._state = ServerState.Error;

            console.log(`Fatal error, closing the socket...`);
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