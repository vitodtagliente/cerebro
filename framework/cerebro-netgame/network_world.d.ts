import NetworkLevel, { NetworkLevelId } from "./network_level";
export default class NetworkWorld {
    private _levels;
    constructor();
    get levels(): Map<NetworkLevelId, NetworkLevel>;
    get(levelId: NetworkLevelId): NetworkLevel;
    getOrCreate(levelId: NetworkLevelId): NetworkLevel;
    copy(world: NetworkWorld): void;
}
