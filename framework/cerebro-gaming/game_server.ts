import { NetworkLayer } from ".";
import { NetworkType } from "./network_layer";

export default class GameServer
{
    private _network: NetworkLayer;

    public constructor(type: NetworkType)
    {
        this._network = NetworkLayer.factory(type);
        this._network.onMessage = (message: string) =>
        {
            console.log(message);
        };
    }

    public listen(port: number): void
    {
        this._network.listen(port);
    }
}