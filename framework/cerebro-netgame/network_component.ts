import { InvalidNetworkId, NetMap, NetworkId, nextNetworkId } from "cerebro-netcore";

export type NetworkComponentType = string;

export default class NetworkComponent
{
    private _id: NetworkId;
    private _type: NetworkComponentType;
    public data: NetMap;

    public constructor(type: NetworkComponentType, id: NetworkId = InvalidNetworkId)
    {
        this._type = type;
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.data = new NetMap;
    }

    public get id(): NetworkId { return this._id; }
    public get type(): NetworkComponentType { return this._type; }

    public copy(component: NetworkComponent): void
    {
        this._id = component._id;
        this._type = component._type;
        this.data.copy(component.data);
    }
}