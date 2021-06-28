import * as dgram from 'dgram';
import Logger from 'cerebro-logger';
import NetworkLayer, { NetworkState, NetworkType, SocketId } from '../network_layer';
import Encoding from '../encoding';

function getSocketId(senderInfo: any): SocketId
{
    const address: string = senderInfo.address;
    const port: number = senderInfo.port;
    return `udps_${address}:${port.toString()}`;
}

class Socket
{
    public constructor(senderInfo: any)
    {
        this.id = getSocketId(senderInfo);
        this.address = senderInfo.address;
        this.port = senderInfo.port;
        this.timestamp = Date.now();
    }

    public id: SocketId;
    public address: string;
    public port: number;
    public timestamp: number;
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

export default class NetworkLayerUDP extends NetworkLayer
{
    private _socket: dgram.Socket = null;
    private _clients: Map<SocketId, Socket>;

    public constructor()
    {
        super(NetworkType.UDP);

        this._socket = dgram.createSocket(Version.v4);
        this._clients = new Map<SocketId, Socket>();

        this._socket.on(EventType.Error, (error: Error) =>
        {
            this._state = NetworkState.Error;

            Logger.error(`Fatal error, closing the socket...`);
            this._socket.close();

            console.log(error.stack);
            this.onError(error);
        });
        this._socket.on(EventType.Listening, () =>
        {
            this._state = NetworkState.Listening;
            Logger.info(`Game Server listening at ${this._socket.address().address}:${Logger.Color.decorate(this._socket.address().port.toString(), Logger.Color.Foreground.Magenta)}...`);
            this.onListening();
        });
        this._socket.on(EventType.Message, (message: string, senderInfo: any) =>
        {
            let socketId: SocketId = getSocketId(senderInfo);
            if (!this._clients.has(socketId))
            {
                this._clients.set(socketId, new Socket(senderInfo));
            }
            else
            {
                const socket: Socket = this._clients[socketId];
                socket.timestamp = Date.now();
            }

            const decodedMessage: string = Encoding.decode(message);
            this.onMessage(socketId, decodedMessage);
        });
    }

    public listen(port: number): void 
    {
        if (this.state == NetworkState.Initialized)
        {
            this._socket.bind(port);
        }
    }
}