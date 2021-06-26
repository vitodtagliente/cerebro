import Endpoint from "./endpoint";
import MessageProcessor from "./message_processor";
import NetworkLayer, { NetworkType } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";
import UserManager from "./user_manager";

export default class GameServer
{
    private _network: NetworkLayer;
    private _messageProcessor: MessageProcessor;
    private _userManager: UserManager;

    public constructor(type: NetworkType)
    {
        this._userManager = new UserManager;
        this._messageProcessor = new MessageProcessor(this._userManager);
        this._network = NetworkLayerFactory.get(type);
        if (this._network)
        {
            this._network.onMessage = (endpoint: Endpoint, message: string) => this._messageProcessor.process(endpoint, message);
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