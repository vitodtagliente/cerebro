import { Component, ComponentId } from '../scene';

export default class ComponentRegister
{
    private static _main: ComponentRegister;
    public static get main(): ComponentRegister
    {
        if (ComponentRegister._main == null)
        {
            ComponentRegister._main = new ComponentRegister();
        }
        return ComponentRegister._main;
    }

    private _components: Map<ComponentId, { new(...args: any[]): Component }>;

    private constructor()
    {
        this._components = new Map<ComponentId, { new(...args: any[]): Component }>();
    }

    public add<T extends Component>(id: ComponentId, constr: { new(...args: any[]): T }): void 
    {
        this._components.set(id, constr);
    }

    public get(id: ComponentId): { new(...args: any[]): Component } 
    {
        return this._components.get(id);
    }
}