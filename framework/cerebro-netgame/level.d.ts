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
    private _version;
    state: LevelState;
    constructor(id: LevelId);
    get id(): LevelId;
    get objects(): Map<NetworkId, NetworkObject>;
    get version(): NetworkId;
    add(): NetworkObject;
    remove(id: NetworkId): boolean;
    get(id: NetworkId): NetworkObject;
    review(): void;
    copyFrom(level: Level): void;
}
