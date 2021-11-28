import { NetworkId } from "cerebro-netcore";
import NetworkObject from "./network_object";
export declare type LevelId = string;
export declare class LevelState {
    data: Map<string, string>;
    constructor();
}
export default class Level {
    private _id;
    private _objects;
    state: LevelState;
    constructor(id: LevelId);
    get id(): LevelId;
    add(): NetworkObject;
    remove(id: NetworkId): boolean;
    get(id: NetworkId): NetworkObject;
}
