import * as dgram from 'dgram';
import Logger from 'cerebro-logger';
import NetworkLayer, { NetworkState, NetworkType, SocketId } from '../network_layer';
import Encoding from '../encoding';

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

export default class NetworkLayerUDP extends NetworkLayer
{
    private _socket: dgram.Socket = null;
    private _clients: Map<SocketId, SocketState>;

    public constructor()
    {
        super(NetworkType.UDP);

        this._socket = dgram.createSocket(Version.v4);
        this._clients = new Map<SocketId, SocketState>();

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
            const socketId: SocketId = getSocketId(senderInfo);
            this._clients.set(socketId, new SocketState);

            const decodedMessage: string = Encoding.decode(message);
            this.onClientMessage(socketId, decodedMessage);
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