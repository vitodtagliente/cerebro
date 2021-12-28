import { NetMap } from 'cerebro-netcore';
import { NetworkId } from 'cerebro-netcore';
import { Math } from './math';
import NetworkComponent, { NetworkComponentType } from './network_component';
export declare class NetworkObjectState {
    data: NetMap;
    constructor();
    copyFrom(state: NetworkObjectState): void;
}
export default class NetworkObject {
    private _id;
    state: NetworkObjectState;
    transform: Math.Transform;
    _components: Array<NetworkComponent>;
    constructor(id?: NetworkId);
    get id(): NetworkId;
    get components(): Array<NetworkComponent>;
    addComponent(component: NetworkComponent): NetworkComponent;
    getComponent(type: NetworkComponentType): NetworkComponent;
    getComponents(type: NetworkComponentType): Array<NetworkComponent>;
    copyFrom(obj: NetworkObject): void;
}
