import { NetMap, NetworkId, nextNetworkId } from "cerebro-netcore";
import NetworkObject from "./network_object";

export type LevelId = string;

export class LevelState
{
    public data: NetMap;

    public constructor()
    {
        this.data = new NetMap;
    }

    public copyFrom(state: LevelState): void
    {
        this.data.clear();
        this.data = Object.assign(new NetMap, state.data);
    }
}

export default class Level
{
    private _id: LevelId;
    private _objects: Map<NetworkId, NetworkObject>;
    private _version: NetworkId;
    public state: LevelState;

    public constructor(id: LevelId)
    {
        this._id = id;
        this._objects = new Map<NetworkId, NetworkObject>();
        this._version = nextNetworkId();
        this.state = new LevelState;
    }

    public get id(): LevelId { return this._id; }
    public get objects(): Map<NetworkId, NetworkObject> { return this._objects; }
    public get version(): NetworkId { return this._version; }

    public add(): NetworkObject
    {
        const object: NetworkObject = new NetworkObject;
        this._objects.set(object.id, object);
        this._version = nextNetworkId();
        return object;
    }

    public remove(id: NetworkId): boolean
    {
        const result: boolean = this._objects.delete(id);
        if (result)
        {
            this._version = nextNetworkId();
        }
        return result;
    }

    public get(id: NetworkId): NetworkObject
    {
        return this._objects.get(id);
    }

    public review(): void
    {
        this._version = nextNetworkId();
    }

    public copyFrom(level: Level): void
    {
        this._objects.clear();
        this._id = level._id;
        for (const [id, obj] of level._objects)
        {
            const object: NetworkObject = new NetworkObject(id);
            object.copyFrom(obj);
            this._objects.set(id, object);
        }
        this._version = level._version;
        this.state.copyFrom(level.state);
    }
}