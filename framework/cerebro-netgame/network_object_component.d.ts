import { NetMap, NetworkId } from "cerebro-netcore";
export declare type NetworkObjectComponentType = string;
export default class NetworkObjectComponent {
    private _id;
    private _type;
    data: NetMap;
    constructor(type: NetworkObjectComponentType, id?: NetworkId);
    get id(): NetworkId;
    get type(): NetworkObjectComponentType;
}
