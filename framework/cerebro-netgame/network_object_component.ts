import { InvalidNetworkId, NetMap, NetworkId, nextNetworkId } from "cerebro-netcore";

export type NetworkObjectComponentType = string;

export default class NetworkObjectComponent
{
    private _id: NetworkId;
    private _type: NetworkObjectComponentType;
    public data: NetMap;

    public constructor(type: NetworkObjectComponentType, id: NetworkId = InvalidNetworkId)
    {
        this._type = type;
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.data = new NetMap;
    }

    public get id(): NetworkId { return this._id; }
    public get type(): NetworkObjectComponentType { return this._type; }

    public copyFrom(component: NetworkObjectComponent): void
    {
        this._id = component._id;
        this._type = component._type;
        this.data = Object.assign(new NetMap, component.data);
    }
}