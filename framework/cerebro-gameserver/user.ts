import NetworkId, { nextNetworkId, InvalidNetworkId } from "./network_id";

export class UserState
{
    public constructor()
    {
        this.name = 'Unknown';
        this.data = new Map<string, any>();
    }

    public name: string;
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