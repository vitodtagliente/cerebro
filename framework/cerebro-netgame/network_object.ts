import { NetMap } from 'cerebro-netcore';
import { InvalidNetworkId, NetworkId, nextNetworkId } from 'cerebro-netcore';
import Component, { ComponentType } from './component';
import { Math } from './math';

export class NetworkObjectState
{
    public data: NetMap;

    public constructor()
    {
        this.data = new NetMap;
    }
}

export default class NetworkObject
{
    private _id: NetworkId;
    public state: NetworkObjectState;
    public transform: Math.Transform;
    public _components: Array<Component>;

    public constructor(id: NetworkId = InvalidNetworkId)
    {
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.state = new NetworkObjectState;
        this.transform = new Math.Transform;
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