import { NetworkComponent } from "cerebro-netgame";
import { Input } from "../device";
import { Renderer } from "../graphics";
import Entity from "./entity";
import World from "./world";

export type ComponentId = string;

export default abstract class Component 
{
    private _owner: Entity;

    public constructor()
    {

    }

    public get owner(): Entity { return this._owner; }

    public attach(owner: Entity): void 
    {
        this._owner = owner;
    }

    public detach(): void 
    {
        this._owner = null;
    }

    public init(): void { }
    public netInit(component: NetworkComponent): void { }
    public netUpdate(component: NetworkComponent): void { }
    public render(renderer: Renderer) { }
    public uninit(): void { }
    public update(world: World, input: Input, deltaTime: number): void { }
}