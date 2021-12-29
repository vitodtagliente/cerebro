import NetworkLevel, { NetworkLevelId } from "./network_level";

export default class NetworkWorld
{
    private _levels: Map<NetworkLevelId, NetworkLevel>;

    public constructor()
    {
        this._levels = new Map<NetworkLevelId, NetworkLevel>();
    }

    public get levels(): Map<NetworkLevelId, NetworkLevel> { return this._levels; }

    public get(levelId: NetworkLevelId): NetworkLevel
    {
        return this._levels.get(levelId);
    }

    public getOrCreate(levelId: NetworkLevelId): NetworkLevel
    {
        if (this._levels.has(levelId) == false)
        {
            this._levels.set(levelId, new NetworkLevel(levelId));
        }
        return this._levels.get(levelId);
    }

    public copy(world: NetworkWorld): void
    {
        this._levels.clear();
        for (const [id, level] of world._levels)
        {
            this.getOrCreate(id).copy(level);
        }
    }
}