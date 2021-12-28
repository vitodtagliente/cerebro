import { NetMap, NetworkId } from "cerebro-netcore";
export declare type NetworkComponentType = string;
export default class NetworkComponent {
    private _id;
    private _type;
    data: NetMap;
    constructor(type: NetworkComponentType, id?: NetworkId);
    get id(): NetworkId;
    get type(): NetworkComponentType;
    copyFrom(component: NetworkComponent): void;
}
