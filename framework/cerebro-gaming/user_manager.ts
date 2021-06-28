import Endpoint from "./endpoint";
import NetworkId, { InvalidNetworkId } from "./network_id";
import User from "./user";

export default class UserManager
{
    private static _idCounter: number = 0;

    private static _main: UserManager;
    public static get main() { return UserManager._main; }

    private _users: Array<User>;

    public constructor()
    {
        UserManager._main = this;
        this._users = new Array<User>();
    }

    public static create(endpoint: Endpoint): User 
    {
        const user: User = new User;
        user.endpoint = endpoint;
        return user;
    }

    public add(user: User): boolean
    {
        if (user.id == InvalidNetworkId) return false;
        if (this.findByUniqueId(user.id)) return false;

        this._users.push(user);
        return true;
    }

    public findByUniqueId(id: NetworkId): User
    {
        if (id == InvalidNetworkId) return null;
        return this._users.find(user => user.id == id);
    }

    public findByEndpoint(endpoint: Endpoint): User
    {
        if (endpoint.isValid == false) return null;
        return this._users.find(user => user.endpoint == endpoint);
    }

    public remove(id: NetworkId): void
    {
        if (id == InvalidNetworkId) return;

        const index: number = this._users.findIndex(user => user.id == id);
        if (index > -1)
        {
            this._users.splice(index, 1);
        }
    }

    public get users(): Array<User> { return this._users; }
}