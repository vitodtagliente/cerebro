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
        if (this.find(gameObject.id) == null)
        {
            this._gameObjects.push(gameObject);
        }
    }

    public find(gameObjectId: NetworkId): GameObject
    {
        if (gameObjectId == InvalidNetworkId) return null;
        return this._gameObjects.find(gameObject => gameObject.id == gameObjectId);
    }

    public remove(gameObjectId: NetworkId): void
    {
        if (gameObjectId == InvalidNetworkId) return;

        const index: number = this._gameObjects.findIndex(gameObject => gameObject.id == gameObjectId);
        if (index > -1)
        {
            this._gameObjects.splice(index, 1);
        }
    }
}