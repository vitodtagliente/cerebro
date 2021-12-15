import { NetMap } from 'cerebro-netcore';
import { NetworkId } from 'cerebro-netcore';
import Component, { ComponentType } from './component';
import { Math } from './math';
export declare class NetworkObjectState {
    data: NetMap;
    constructor();
}
export default class NetworkObject {
    private _id;
    state: NetworkObjectState;
    transform: Math.Transform;
    _components: Array<Component>;
    constructor(id?: NetworkId);
    get id(): NetworkId;
    get components(): Array<Component>;
    addComponent(component: Component): Component;
    getComponent(type: ComponentType): Component;
    getComponents(type: ComponentType): Array<Component>;
}
