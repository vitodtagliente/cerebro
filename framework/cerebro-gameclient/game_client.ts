import { StatusCode } from "cerebro-http";
import Logger from "cerebro-logger";
import Encoding from "./encoding";
import Message from "./message";
import NetworkLayer, { NetworkState, NetworkType } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";

type ConnectionHandler = () => void;

export default class GameClient
{
    public onConnection: ConnectionHandler = () => { };

    private _network: NetworkLayer;

    public constructor(type: NetworkType)
    {
        this._network = NetworkLayerFactory.get(type);
        if (this._network == null)
        {
            Logger.error(`Cannot initialize the NetworkLAyer of type[${type}]`);
            return;
        }
    }

    public connect(address: string, port: number): void
    {
        if (this._network)
        {
            this._network.onConnection = this.onConnection;
            this._network.connect(address, port);
        }
    }

    public close(): void
    {
        if (this._network)
        {
            this._network.close();
        }
    }

    public send(message: Message): void
    {
        if (this._network && this._network.state == NetworkState.Connected)
        {
            const json: string = Encoding.stringify(message);
            const encodedMessage: string = Encoding.encode(json);
            this._network.send(encodedMessage);
        }
    }

    public call<RequestType, ResponseType>(commandId: string, request: RequestType, response?: ResponseType): StatusCode
    {
        if (this._network && this._network.state == NetworkState.Connected)
        {
            const message: Message = new Message;
            message.header.type = commandId;
            message.body = Encoding.stringify(request);

            this.send(message);
            return StatusCode.OK;
        }
        return StatusCode.BadRequest;
    }
}