import { InvalidNetworkId, NetworkId } from "cerebro-netcore";
import { NetworkComponent } from "cerebro-netgame";
import { Renderer } from "../graphics";
import Entity from "./entity";
import World from "./world";

export type ComponentId = string;

export default abstract class Component 
{
    private _owner: Entity;
    private _netId: NetworkId;

    public constructor()
    {

    }

    public get owner(): Entity { return this._owner; }
    public get isNetworkComponent(): boolean { return this._netId != InvalidNetworkId; }
    public get netId(): NetworkId { return this._netId; }

    public attach(owner: Entity): void 
    {
        this._owner = owner;
    }

    public detach(): void 
    {
        this._owner = null;
    }

    public init(): void { }
    public netInit(component: NetworkComponent): void
    {
        this._netId = component.id;
        this.netUpdate(component);
    }
    public netSerialize(): NetworkComponent { return null; }
    public netUpdate(component: NetworkComponent): void { }
    public render(renderer: Renderer) { }
    public uninit(): void { }
    public update(world: World, deltaTime: number): void { }

    public serialize(): any 
    {
        return { 'type': '' };
    }

    public deserialize(data: any): void 
    {

    }
}