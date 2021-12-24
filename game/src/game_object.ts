import Component from "./component";
import Input from "./input";
import Renderer from "./renderer";
import Transform from "./transform";
import World from "./world";

export default class GameObject 
{
    private _components: Array<Component>;
    private _world: World;
    public transform: Transform;

    public construct()
    {
        this._components = new Array<Component>();
        this.transform = new Transform;
    }

    public get components(): Array<Component> { return this._components; }

    public spawn(world: World): void 
    {
        this._world = world;
    }

    public addComponent(component: Component): Component
    {
        this._components.push(component);
        component.attach(this);
        return component;
    }

    public removeComponent(component: Component): void 
    {
        const index: number = this._components.findIndex(c => c == component);
        if (index >= 0)
        {
            component.uninit();
            component.detach();
            this._components.splice(index, 1);
        }
    }

    public init(): void 
    {
        for (const component of this._components)
        {
            component.init();
        }
    }

    public update(input: Input, deltaTime: number): void 
    {
        for (const component of this._components)
        {
            component.update(this._world, input, deltaTime);
        }
    }

    public render(renderer: Renderer): void
    {
        for (const component of this._components)
        {
            component.render(renderer);
        }
    }

    public prepareToDestroy(): void 
    {
        for (const component of this._components)
        {
            this.removeComponent(component);
        }
    }
}