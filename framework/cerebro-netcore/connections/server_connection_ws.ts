import * as http from 'http';
import * as WS from 'websocket';
import Encoding from '../encoding';
import Message from '../message';
import { NetworkProtocol, SocketId } from '../network';
import { nextNetworkId } from '../network_id';
import ServerConnection, { ServerConnectionState } from '../server_connection';

enum EventType
{
    Connection = 'connection',
    Disconnection = 'close',
    Error = 'error',
    Listening = 'listening',
    Message = 'message',
    Request = 'request',
    Upgrade = 'upgrade'
}

export default class ServerConnectionWS extends ServerConnection
{
    private _clients: Map<SocketId, WS.connection>;
    private _http: http.Server;
    private _socket: WS.server = null;

    public constructor()
    {
        super(NetworkProtocol.WebSocket);
        this._clients = new Map<SocketId, WS.connection>();
    }

    public listen(port: number): void 
    {
        if (this.state != ServerConnectionState.Initialized)
        {
            return;
        }

        this._http = http.createServer((request, response) =>
        {
            console.log(`[${new Date()}] Received request for ${request.url}`);
            response.writeHead(404);
            response.end();
        });
        this._http.listen(port, () =>
        {
            console.log(`[${new Date()}] Server is listening on port ${port}`);
        });

        this._socket = new WS.server({
            httpServer: this._http,
            // You should not use autoAcceptConnections for production
            // applications, as it defeats all standard cross-origin protection
            // facilities built into the protocol and the browser.  You should
            // *always* verify the connection's origin and decide whether or not
            // to accept it.
            autoAcceptConnections: false
        });

        this._socket.on(EventType.Request, (request: WS.request) =>
        {
            // if (!originIsAllowed(request.origin))
            // {
            //     // Make sure we only accept requests from an allowed origin
            //     request.reject();
            //     console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
            //     return;
            // }

            const connection: WS.connection = request.accept('cerebro', request.origin);

            const socketId: SocketId = nextNetworkId();
            this._clients.set(socketId, connection);
            this.onClientConnection(socketId);

            connection.on(EventType.Message, (message: WS.Message) =>
            {
                if (message.type === 'utf8')
                {
                    const decodedMessage: string = Encoding.decode(message.utf8Data);
                    this.onClientMessage(socketId, decodedMessage);
                }
            });
            connection.on(EventType.Disconnection, (reasonCode: number, description: string) =>
            {
                this._clients.delete(socketId);
                this.onClientDisconnection(socketId);
            });
        });

        this._state = ServerConnectionState.Listening;
        console.log(`Server listening at port ${port}...`);
        this.onListening();
    }

    public close(): void
    {
        if (this.state == ServerConnectionState.Initialized)
        {
            this._socket.closeAllConnections();
            this._http.close();
        }
    }

    public broadcast(message: any | Message): void
    {
        if (this.state == ServerConnectionState.Listening)
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

            this._socket.connections.forEach((client: WS.connection) =>
            {
                client.send(data);
            });
        }
    }

    public send(socketId: SocketId, message: any | Message): void
    {
        if (this._socket && this._state == ServerConnectionState.Listening)
        {
            const socket: WS.connection = this._clients.get(socketId);
            if (socket)
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
                socket.sendUTF(data);
            }
        }
    }
}