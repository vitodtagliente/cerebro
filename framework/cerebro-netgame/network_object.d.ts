import { NetMap } from 'cerebro-netcore';
import { NetworkId } from 'cerebro-netcore';
import NetworkComponent, { NetworkComponentType } from './network_component';
import { NetworkMath } from './network_math';
export declare class NetworkObjectState {
    data: NetMap;
    constructor();
    copyFrom(state: NetworkObjectState): void;
}
export default class NetworkObject {
    private _id;
    state: NetworkObjectState;
    transform: NetworkMath.Transform;
    _components: Array<NetworkComponent>;
    constructor(id?: NetworkId);
    get id(): NetworkId;
    get components(): Array<NetworkComponent>;
    addComponent(component: NetworkComponent): NetworkComponent;
    getComponent(type: NetworkComponentType): NetworkComponent;
    getComponents(type: NetworkComponentType): Array<NetworkComponent>;
    copy(obj: NetworkObject): void;
}
