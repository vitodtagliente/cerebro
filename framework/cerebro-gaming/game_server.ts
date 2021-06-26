import { NetworkLayer } from ".";

export default class GameServer
{
    private _network: NetworkLayer;

    public constructor()
    {
        this._network = NetworkLayer.get(NetworkLayer.Type.UDP);
    }

    public listen(port: number): void
    {
        this._network.listen(port);
    }
}