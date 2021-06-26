
class Endpoint
{
    public static readonly InvalidAddress: string = '';
    public static readonly InvalidPort: number = -1;

    public constructor(_address: string, _port: number)
    {
        this.address = _address;
        this.port = _port;
    }

    public address: string;
    public port: number;

    public get isValid() { return this.address != Endpoint.InvalidAddress && this.port != Endpoint.InvalidPort; }
}

class State
{
    public data: any;
}

export type UniqueId = string;
export const InvalidUniqueId: UniqueId = "";

class User
{
    public static readonly Endpoint = Endpoint;
    public static readonly State = State;

    public constructor()
    {
        this.uniqueId = InvalidUniqueId;
        this.endpoint = new Endpoint(Endpoint.InvalidAddress, Endpoint.InvalidPort);
        this.state = new State;
    }

    public uniqueId: UniqueId;
    public endpoint: Endpoint;
    public state: State;
}

export default class UserManager
{
    public static readonly User = User;

    private static _idCounter: number = 0;

    private static _main: UserManager;
    public static get main() { return UserManager._main; }

    private _users: Array<User>;

    public construct()
    {
        this._users = [];
    }

    public static create(endpoint: Endpoint): User 
    {
        const user: User = new User;
        user.uniqueId = (++UserManager._idCounter).toString();
        user.endpoint = endpoint;
        return user;
    }

    public add(user: User): boolean
    {
        if (user.uniqueId == InvalidUniqueId) return false;
        if (this.find(user.uniqueId)) return false;

        this._users.push(user);
        return true;
    }

    public find(uniqueId: UniqueId): User
    {
        if (uniqueId == InvalidUniqueId) return null;
        return this._users.find(user => user.uniqueId == uniqueId);
    }

    public remove(uniqueId: UniqueId): void
    {
        if (uniqueId == InvalidUniqueId) return;

        const index: number = this._users.findIndex(user => user.uniqueId == uniqueId);
        if (index > -1)
        {
            this._users.splice(index, 1);
        }
    }

    public get users(): Array<User> { return this._users; }
}