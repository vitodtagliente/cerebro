import GameObject from "./game_object";
import Input from "./input";
import Renderer from "./renderer";
import World from "./world";

export default class Component 
{
    private _owner: GameObject;

    public constructor()
    {

    }

    public get owner(): GameObject { return this._owner; }

    public attach(owner: GameObject): void 
    {
        this._owner = owner;
    }

    public detach(): void 
    {
        this._owner = null;
    }

    public init(): void { }
    public render(renderer: Renderer) { }
    public uninit(): void { }
    public update(world: World, input: Input, deltaTime: number): void { }
}