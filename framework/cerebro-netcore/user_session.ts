import NetMap from "./net_map";
import { RoomId } from "./room";
import User from "./user";

export default class UserSession
{
    public constructor()
    {
        this.authenticated = false;
        this.user = new User;
        this.data = new NetMap;
    }

    public authenticated: boolean;
    public user: User;
    public room: RoomId;
    public data: NetMap;
}