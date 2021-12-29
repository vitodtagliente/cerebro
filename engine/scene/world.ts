import { InvalidNetworkId, NetworkId } from "cerebro-netcore";
import { NetworkLevel } from "cerebro-netgame";
import { Signal } from "../core";
import Entity from "./entity";

export default class World
{
    private _entities: Array<Entity>;
    private _lastWorldVersion: NetworkId = InvalidNetworkId;

    public onEntitySpawn: Signal<Entity>;

    public constructor()
    {
        this._entities = new Array<Entity>();
        this.onEntitySpawn = new Signal<Entity>();
    }

    public get entities(): Array<Entity> { return this._entities; }

    public spawn(object: Entity): Entity
    {
        this._entities.push(object);
        object.spawn(this);
        return object;
    }

    public destroy(entity: Entity): void 
    {
        const index: number = this._entities.findIndex(e => e == entity);
        if (index >= 0)
        {
            entity.prepareToDestroy();
            this._entities.splice(index, 1);
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
        for (const entity of this._entities)
        {
            if (entity.isNetworkObject == false)
                continue;

            const index: number = netIds.findIndex(id => id == entity.netId);
            if (index >= 0)
            {
                entity.netUpdate(level.get(entity.netId));
                netIds.splice(index, 1);
            }
            else 
            {
                this.destroy(entity);
            }
        }
        // spawn the new ones
        for (const netId of netIds)
        {
            const entity: Entity = this.spawn(new Entity());
            entity.netInit(level.get(netId));
            this.onEntitySpawn.emit(entity);
        }
    }
}