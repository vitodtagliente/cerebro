import MessageProcessor from "./message_processor";
import NetworkLayer, { NetworkType } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";

export default class GameServer
{
    private _network: NetworkLayer;
    private _messageProcessor: MessageProcessor;

    public constructor(type: NetworkType)
    {
        this._messageProcessor = new MessageProcessor;
        this._network = NetworkLayerFactory.get(type);
        if (this._network)
        {
            this._network.onMessage = (message: string) => this._messageProcessor.process(message);
        }
    }

    public listen(port: number): void
    {
        if (this._network)
        {
            this._network.listen(port);
        }
    }
}