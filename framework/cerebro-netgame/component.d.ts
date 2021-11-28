import { NetworkId } from "../cerebro-netcore";
export declare type ComponentType = string;
export default class Component {
    private _id;
    private _type;
    data: Map<string, string>;
    constructor(type: ComponentType, id?: NetworkId);
    get id(): NetworkId;
    get type(): ComponentType;
}
