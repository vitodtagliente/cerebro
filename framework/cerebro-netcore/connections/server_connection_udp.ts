import * as dgram from 'dgram';
import Encoding from '../encoding';
import Message from '../message';
import { NetworkProtocol, SocketId } from '../network';
import ServerConnection, { ServerConnectionState } from '../server_connection';

function getSocketId(senderInfo: any): SocketId
{
    const address: string = senderInfo.address;
    const port: number = senderInfo.port;
    return `udps_${address}:${port}`;
}

class SocketState
{
    public constructor()
    {
        this.timespan = Date.now();
    }

    public timespan: number;
}

enum Version
{
    v4 = 'udp4',
    v6 = 'udp6'
}

enum EventType
{
    Error = 'error',
    Listening = 'listening',
    Message = 'message'
}

export default class ServerConnectionUDP extends ServerConnection
{
    private _socket: dgram.Socket = null;
    private _clients: Map<SocketId, SocketState>;

    public constructor()
    {
        super(NetworkProtocol.UDP);

        this._socket = dgram.createSocket(Version.v4);
        this._clients = new Map<SocketId, SocketState>();

        this._socket.on(EventType.Error, (error: Error) =>
        {
            this._state = ServerConnectionState.Error;

            console.error(`Fatal error, closing the socket...`);
            this._socket.close();

            console.log(error.stack);
            this.onError(error);
        });
        this._socket.on(EventType.Listening, () =>
        {
            this._state = ServerConnectionState.Listening;
            console.log(`Game Server listening at ${this._socket.address().address}:${this._socket.address().port.toString()}...`);
            this.onListening();
        });
        this._socket.on(EventType.Message, (message: string, senderInfo: any) =>
        {
            const socketId: SocketId = getSocketId(senderInfo);
            this._clients.set(socketId, new SocketState);

            const decodedMessage: string = Encoding.decode(message);
            this.onClientMessage(socketId, decodedMessage);
        });
    }

    public listen(port: number): void 
    {
        if (this.state == ServerConnectionState.Initialized)
        {
            this._socket.bind(port);
        }
    }

    public send(socketId: SocketId, message: any | Message): void
    {
        if (this._socket && this._state == ServerConnectionState.Listening)
        {
            console.assert(false, "Not implemented");
            const socket: dgram.Socket = null; // = this._clients.get(socketId);
            if (socket)
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
                socket.send(data);
            }
        }
    }
}