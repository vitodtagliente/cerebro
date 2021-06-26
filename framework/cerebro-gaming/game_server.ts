import NetworkLayer, { NetworkType } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";

export default class GameServer
{
    private _network: NetworkLayer;

    public constructor(type: NetworkType)
    {
        this._network = NetworkLayerFactory.get(type);
        if (this._network)
        {
            this._network.onMessage = (message: string) =>
            {
                console.log(message);
            };
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