import { NetMap } from 'cerebro-netcore';
import { InvalidNetworkId, NetworkId, nextNetworkId } from 'cerebro-netcore';
import Component, { ComponentType } from './component';
import { Math } from './math';
import NetworkComponent from './network_component';

export class NetworkObjectState
{
    public data: NetMap;

    public constructor()
    {
        this.data = new NetMap;
    }

    public copyFrom(state: NetworkObjectState): void
    {
        this.data.clear();
        this.data = Object.assign(new NetMap, state.data);
    }
}

export default class NetworkObject
{
    private _id: NetworkId;
    public state: NetworkObjectState;
    public transform: Math.Transform;
    public _components: Array<NetworkComponent>;

    public constructor(id: NetworkId = InvalidNetworkId)
    {
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.state = new NetworkObjectState;
        this.transform = new Math.Transform;
        this._components = new Array<NetworkComponent>();
    }

    public get id(): NetworkId { return this._id; }
    public get components(): Array<NetworkComponent> { return this._components; }

    public addComponent(component: NetworkComponent): NetworkComponent
    {
        this._components.push(component);
        return component;
    }

    public getComponent(type: ComponentType): NetworkComponent
    {
        return this._components.find(component => component.type == type);
    }

    public getComponents(type: ComponentType): Array<NetworkComponent>
    {
        return this._components.filter(component => component.type == type);
    }

    public copyFrom(obj: NetworkObject): void
    {
        this._id = obj._id;
        this.state.copyFrom(obj.state);
        this.transform.copyFrom(obj.transform);
        this._components.splice(0, this._components.length);
        for (const component of obj._components)
        {
            const comp: NetworkComponent = new NetworkComponent(component.id, component.type);
            comp.copyFrom(component);
            this._components.push(comp);
        }
    }
}