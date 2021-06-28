import Endpoint from "./endpoint";
import NetworkId, { InvalidNetworkId, nextNetworkId } from "./network_id";

export class UserState
{
    public constructor()
    {
        this.name = 'Unknown';
        this.authenticated = false;
        this.data = new Map<string, any>();
    }

    public name: string;
    public authenticated: boolean;
    public data: Map<string, any>;
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