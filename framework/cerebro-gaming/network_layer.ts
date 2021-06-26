import NetworkLayerUDP from "./network_layer_udp";

export enum NetworkType
{
    UDP,
    WebSockets
}

export default abstract class NetworkLayer
{
    public static get(type: NetworkType): NetworkLayer
    {
        switch (type)
        {
            case NetworkType.UDP:
                return new NetworkLayerUDP();
            case NetworkType.WebSockets:
            default:
                return null;
        }
    }

    private _type: NetworkType;

    public constructor(type: NetworkType)
    {
        this._type = type;
    }

    public get type(): NetworkType { return this._type; }
}