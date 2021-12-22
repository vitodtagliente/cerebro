import NetworkId, { nextNetworkId } from "./network_id";
import NetMap from "./net_map";
import { RoomId } from "./room";
import User from "./user";

export default class UserSession
{
    public constructor()
    {
        this.id = nextNetworkId();
        this.authenticated = false;
        this.user = new User;
        this.data = new NetMap;
    }

    public id: NetworkId;
    public authenticated: boolean;
    public user: User;
    public room: RoomId;
    public data: NetMap;
}