import * as dgram from 'dgram';
import Logger from 'cerebro-logger';
import NetworkLayer from "./network_layer";
import { Encoding } from '.';

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

    public constructor()
    {
        super(NetworkLayer.Type.UDP);

        this._socket = dgram.createSocket(Version.v4);

        this._socket.on(EventType.Error, (error: Error) =>
        {
            this._state = NetworkLayer.State.Error;

            Logger.error(`Fatal error, closing the socket...`);
            this._socket.close();

            console.log(error.stack);
            this.onError(error);
        });
        this._socket.on(EventType.Listening, () =>
        {
            this._state = NetworkLayer.State.Listening;
            Logger.info(`Game Server listening at ${this._socket.address().address}:${Logger.Color.decorate(this._socket.address().port.toString(), Logger.Color.Foreground.Magenta)}`);
            this.onListening();
        });
        this._socket.on(EventType.Message, (message: string, senderInfo: any) =>
        {
            const decodedMessage: string = Encoding.decode(message);
            console.log(senderInfo);
            this.onMessage(decodedMessage)
        });
    }

    public listen(port: number): void 
    {
        if (this.state == NetworkLayer.State.Initialized)
        {
            this._socket.bind(port);
        }
    }
}