import { NetMap } from 'cerebro-netcore';
import { InvalidNetworkId, NetworkId, nextNetworkId } from 'cerebro-netcore';
import NetworkComponent, { NetworkComponentType } from './network_component';
import { NetworkMath } from './network_math';

export class NetworkObjectState
{
    public data: NetMap;

    public constructor()
    {
        this.data = new NetMap;
    }

    public copyFrom(state: NetworkObjectState): void
    {
        this.data.copy(state.data);
    }
}

export default class NetworkObject
{
    private _id: NetworkId;
    public state: NetworkObjectState;
    public transform: NetworkMath.Transform;
    public _components: Array<NetworkComponent>;

    public constructor(id: NetworkId = InvalidNetworkId)
    {
        this._id = id == InvalidNetworkId ? nextNetworkId() : id;
        this.state = new NetworkObjectState;
        this.transform = new NetworkMath.Transform;
        this._components = new Array<NetworkComponent>();
    }

    public get id(): NetworkId { return this._id; }
    public get components(): Array<NetworkComponent> { return this._components; }

    public addComponent(component: NetworkComponent): NetworkComponent
    {
        this._components.push(component);
        return component;
    }

    public getComponent(type: NetworkComponentType): NetworkComponent
    {
        return this._components.find(component => component.type == type);
    }

    public getComponents(type: NetworkComponentType): Array<NetworkComponent>
    {
        return this._components.filter(component => component.type == type);
    }

    public copy(obj: NetworkObject): void
    {
        this._id = obj._id;
        this.state.copyFrom(obj.state);
        this.transform.copy(obj.transform);
        this._components.splice(0, this._components.length);
        for (const component of obj._components)
        {
            const comp: NetworkComponent = new NetworkComponent(component.id, component.type);
            comp.copy(component);
            this._components.push(comp);
        }
    }
}