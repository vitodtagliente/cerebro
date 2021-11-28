import NetworkId from "./network_id";
export declare class UserState {
    constructor();
    name: string;
    data: Map<string, any>;
}
export default class User {
    constructor();
    id: NetworkId;
    state: UserState;
}
