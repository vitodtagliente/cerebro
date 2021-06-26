
class Endpoint
{
    public static readonly InvalidAddress: string = '';
    public static readonly InvalidPort: number = -1;

    public constructor(_address: string, _port: number)
    {
        this.address = _address;
        this.port = _port;
    }

    public address: string = Endpoint.InvalidAddress;
    public port: number = Endpoint.InvalidPort;

    public get isValid() { return this.address != Endpoint.InvalidAddress && this.port != Endpoint.InvalidPort; }
}

class State
{
    public data: any;
}

class User
{
    public readonly Endpoint = Endpoint;
    public readonly State = State;

    public uniqueId: string = "";
    public endpoint: Endpoint;

    public state: State;
}

export default class UserManager
{
    public readonly User = User;

    private _users: Array<User> = [];

    public construct()
    {

    }

    public get users(): Array<User> { return this._users; }
}