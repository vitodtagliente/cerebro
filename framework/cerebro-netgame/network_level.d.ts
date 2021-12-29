import { NetMap, NetworkId } from "cerebro-netcore";
import NetworkObject from "./network_object";
export declare type NetworkLevelId = string;
export declare class NetworkLevelState {
    data: NetMap;
    constructor();
    copyFrom(state: NetworkLevelState): void;
}
export default class NetworkLevel {
    private _id;
    private _objects;
    private _version;
    state: NetworkLevelState;
    constructor(id: NetworkLevelId);
    get id(): NetworkLevelId;
    get objects(): Map<NetworkId, NetworkObject>;
    get version(): NetworkId;
    add(): NetworkObject;
    remove(id: NetworkId): boolean;
    get(id: NetworkId): NetworkObject;
    review(): void;
    copy(level: NetworkLevel): void;
}
