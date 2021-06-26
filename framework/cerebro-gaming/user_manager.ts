import Endpoint from "./endpoint";

export class UserState
{
    public data: any;
}

export type UniqueId = string;
export const InvalidUniqueId: UniqueId = "";

export class User
{
    public constructor()
    {
        this.uniqueId = InvalidUniqueId;
        this.endpoint = new Endpoint(Endpoint.InvalidAddress, Endpoint.InvalidPort);
        this.state = new UserState;
    }

    public uniqueId: UniqueId;
    public endpoint: Endpoint;
    public state: UserState;
}

export default class UserManager
{
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
        if (this.findByUniqueId(user.uniqueId)) return false;

        this._users.push(user);
        return true;
    }

    public findByUniqueId(uniqueId: UniqueId): User
    {
        if (uniqueId == InvalidUniqueId) return null;
        return this._users.find(user => user.uniqueId == uniqueId);
    }

    public findByEndpoint(endpoint: Endpoint): User
    {
        if (endpoint.isValid == false) return null;
        return this._users.find(user => user.endpoint == endpoint);
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