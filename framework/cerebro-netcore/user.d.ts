import { NetMap } from ".";
import NetworkId from "./network_id";
export declare class UserState {
    constructor();
    name: string;
    data: NetMap;
}
export default class User {
    constructor();
    id: NetworkId;
    state: UserState;
}
