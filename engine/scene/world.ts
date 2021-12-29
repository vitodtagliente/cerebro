import { InvalidNetworkId, NetworkId } from "cerebro-netcore";
import { NetworkLevel } from "cerebro-netgame";
import Entity from "./entity";

export default class World
{
    private _objects: Array<Entity>;
    private _lastWorldVersion: NetworkId = InvalidNetworkId;

    public constructor()
    {
        this._objects = new Array<Entity>();
    }

    public get objects(): Array<Entity> { return this._objects; }

    public spawn(object: Entity): Entity
    {
        this._objects.push(object);
        object.spawn(this);
        object.init();
        return object;
    }

    public destroy(object: Entity): void 
    {
        const index: number = this._objects.findIndex(obj => obj == object);
        if (index >= 0)
        {
            object.prepareToDestroy();
            this._objects.splice(index, 1);
        }
    }

    public netUpdate(level: NetworkLevel): void 
    {
        if (this._lastWorldVersion == level.version)
        {
            return;
        }

        this._lastWorldVersion = level.version;

        const netIds: Array<NetworkId> = [...level.objects.keys()];
        // update the objects the world already has
        for (const object of this._objects)
        {
            if (object.isNetworkObject == false)
                continue;

            const index: number = netIds.findIndex(id => id == object.netId);
            if (index >= 0)
            {
                object.netUpdate(level.get(object.netId));
                netIds.splice(index, 1);
            }
            else 
            {
                this.destroy(object);
            }
        }
        // spawn the new ones
        for (const netId of netIds)
        {
            const object: Entity = this.spawn(new Entity());
            object.netInit(level.get(netId));
        }
    }
}