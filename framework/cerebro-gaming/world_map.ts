import GameObject from "./game_object";
import NetworkId, { InvalidNetworkId } from "./network_id";

export type WorldMapId = string;
export const InvalidWorldMapId: WorldMapId = '';

export default class WorldMap
{
    private _id: WorldMapId;
    private _gameObjects: Array<GameObject>;

    public constructor(id: WorldMapId)
    {
        this._id = id;
        this._gameObjects = [];
    }

    public get id(): WorldMapId { return this._id; }
    public get gameObjects(): Array<GameObject> { return this._gameObjects; }

    public add(gameObject: GameObject): void
    {
        if (this.find(gameObject.networkId) == null)
        {
            this._gameObjects.push(gameObject);
        }
    }

    public find(networkId: NetworkId): GameObject
    {
        if (networkId == InvalidNetworkId) return null;
        return this._gameObjects.find(gameObject => gameObject.networkId == networkId);
    }

    public remove(networkId: NetworkId): void
    {
        if (networkId == InvalidNetworkId) return;

        const index: number = this._gameObjects.findIndex(gameObject => gameObject.networkId == networkId);
        if (index > -1)
        {
            this._gameObjects.splice(index, 1);
        }
    }
}