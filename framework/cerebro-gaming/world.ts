import WorldMap, { WorldMapId, InvalidWorldMapId } from "./world_map";


export default class World
{
    private static _main: World = null;
    public static get main(): World { return World._main; }

    private _maps: Map<WorldMapId, WorldMap>;

    public constructor()
    {
        World._main = this;
        this._maps = new Map<WorldMapId, WorldMap>();
    }

    public get(mapId: WorldMapId): WorldMap
    {
        if (mapId == InvalidWorldMapId) return null;

        if (this._maps.has(mapId) == false)
        {
            this._maps.set(mapId, new WorldMap(mapId));
        }
        return this._maps[mapId];
    }
}