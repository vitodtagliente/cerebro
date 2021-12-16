import Component, { ComponentId } from "./component";

export default class ComponentRegister<T extends Component>
{
    private _components: Map<ComponentId, T>;

    public constructor()
    {
        this._components = new Map<ComponentId, T>();
    }

    public get components(): Map<ComponentId, T> { return this._components; }

    public add(component: T): void
    {
        this._components.set(component.id, component);

        component.initialize();
    }

    public delete(ComponentId: ComponentId): void
    {
        this._components.delete(ComponentId);
    }

    public find(ComponentId: ComponentId): T
    {
        return this._components.get(ComponentId);
    }

    public has(ComponentId: ComponentId): boolean
    {
        return this._components.has(ComponentId);
    }
}