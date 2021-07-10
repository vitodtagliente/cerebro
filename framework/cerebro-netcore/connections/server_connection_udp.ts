import * as dgram from 'dgram';
import Encoding from '../encoding';
import Message from '../message';
import { NetworkProtocol, SocketId } from '../network';
import ServerConnection, { ServerConnectionState } from '../server_connection';
import TimeMap from '../time_map';

class UdpSocket
{
    public id: SocketId;
    public address: string;
    public port: number;

    public constructor(address: string, port: number)
    {
        this.address = address;
        this.port = port;
        this.id = this._generateSocketId(address, port);
    }

    private _generateSocketId(address: string, port: number): SocketId
    {
        return `udps_${address}:${port}`;
    }
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
    private _clients: TimeMap<SocketId, UdpSocket>;

    public constructor()
    {
        super(NetworkProtocol.UDP);

        this._socket = dgram.createSocket(Version.v4);
        this._clients = new TimeMap<SocketId, UdpSocket>(120000); // 2 mins

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
            const socket: UdpSocket = new UdpSocket(senderInfo.address, senderInfo.port);
            this._clients.set(socket.id, socket);

            const decodedMessage: string = Encoding.decode(message);
            this.onClientMessage(socket.id, decodedMessage);
        });
    }

    public listen(port: number): void 
    {
        if (this.state == ServerConnectionState.Initialized)
        {
            this._socket.bind(port);
        }
    }

    public close(): void
    {
        if (this.state == ServerConnectionState.Initialized)
        {
            this._socket.close();
        }
    }

    public broadcast(message: any | Message): void
    {
        if (this._socket && this._state == ServerConnectionState.Listening)
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

            for (const socketId of this._clients.keys())
            {
                const socket: UdpSocket = this._clients.get(socketId);
                if (socket)
                {
                    this._socket.send(data, socket.port, socket.address);
                }
            }
        }
    }

    public send(socketId: SocketId, message: any | Message): void
    {
        if (this._socket && this._state == ServerConnectionState.Listening)
        {
            const socket: UdpSocket = this._clients.get(socketId);
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
                this._socket.send(data, socket.port, socket.address);
            }
        }
    }
}