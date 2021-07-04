import { InvalidNetworkId, NetworkId, nextNetworkId } from 'cerebro-netcore';
import Component, { ComponentType } from './component';

export class NetworkObjectState
{
    public data: Map<string, string>;

    public constructor()
    {
        this.data = new Map<string, string>();
    }
}

export default class NetworkObject
{
    private _id: NetworkId;
    public state: NetworkObjectState;
    public _components: Array<Component>;

    public constructor(id = InvalidNetworkId)
    {
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.state = new NetworkObjectState;
        this._components = new Array<Component>();
    }

    public get id(): NetworkId { return this._id; }
    public get components(): Array<Component> { return this._components; }

    public addComponent(component: Component): Component
    {
        this._components.push(component);
        return component;
    }

    public getComponent(type: ComponentType): Component
    {
        return this._components.find(component => component.type == type);
    }

    public getComponents(type: ComponentType): Array<Component>
    {
        return this._components.filter(component => component.type == type);
    }
}