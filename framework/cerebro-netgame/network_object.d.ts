import { NetMap } from 'cerebro-netcore';
import { NetworkId } from 'cerebro-netcore';
import { ComponentType } from './component';
import { Math } from './math';
import NetworkObjectComponent from './network_object_component';
export declare class NetworkObjectState {
    data: NetMap;
    constructor();
    copyFrom(state: NetworkObjectState): void;
}
export default class NetworkObject {
    private _id;
    state: NetworkObjectState;
    transform: Math.Transform;
    _components: Array<NetworkObjectComponent>;
    constructor(id?: NetworkId);
    get id(): NetworkId;
    get components(): Array<NetworkObjectComponent>;
    addComponent(component: NetworkObjectComponent): NetworkObjectComponent;
    getComponent(type: ComponentType): NetworkObjectComponent;
    getComponents(type: ComponentType): Array<NetworkObjectComponent>;
    copyFrom(obj: NetworkObject): void;
}
