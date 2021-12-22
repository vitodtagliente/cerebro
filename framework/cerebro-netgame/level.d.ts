import { NetMap, NetworkId } from "cerebro-netcore";
import NetworkObject from "./network_object";
export declare type LevelId = string;
export declare class LevelState {
    data: NetMap;
    constructor();
    copyFrom(state: LevelState): void;
}
export default class Level {
    private _id;
    private _objects;
    state: LevelState;
    constructor(id: LevelId);
    get id(): LevelId;
    get objects(): Map<NetworkId, NetworkObject>;
    add(): NetworkObject;
    remove(id: NetworkId): boolean;
    get(id: NetworkId): NetworkObject;
    copyFrom(level: Level): void;
}
