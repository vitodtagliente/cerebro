import { InvalidNetworkId, NetworkId, nextNetworkId } from "../cerebro-netcore";

export type ComponentType = string;

export default abstract class Component
{
    private _id: NetworkId;
    private _type: ComponentType;
    public data: Map<string, string>;

    public constructor(type: ComponentType, id: NetworkId)
    {
        this._type = type;
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.data = new Map<string, string>();
    }

    public get id(): NetworkId { return this._id; }
    public get type(): ComponentType { return this._type; }
}