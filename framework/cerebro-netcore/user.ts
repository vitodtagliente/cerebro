import { NetMap } from ".";
import NetworkId, { nextNetworkId } from "./network_id";

export class UserState
{
    public constructor()
    {
        this.name = 'Unknown';
        this.data = new NetMap;
    }

    public name: string;
    public data: NetMap;
}

export default class User
{
    public constructor()
    {
        this.id = nextNetworkId();
        this.state = new UserState;
    }

    public id: NetworkId;
    public state: UserState;
}