import NetMap from "./net_map";
import { RoomId } from "./room";
import User from "./user";
export default class UserSession {
    constructor();
    authenticated: boolean;
    user: User;
    room: RoomId;
    data: NetMap;
}
