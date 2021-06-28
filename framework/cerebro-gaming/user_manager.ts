import NetworkId, { InvalidNetworkId } from "./network_id";
import User from "./user";

export default class UserManager
{
    private static _main: UserManager;
    public static get main() { return UserManager._main; }

    private _users: Array<User>;

    public constructor()
    {
        UserManager._main = this;
        this._users = new Array<User>();
    }

    public add(user: User): void
    {
        if (user.id == InvalidNetworkId) return;

        if (!this.find(user.id))
        {
            this._users.push(user);
        }
    }

    public find(id: NetworkId): User
    {
        if (id == InvalidNetworkId) return null;
        return this._users.find(user => user.id == id);
    }

    public remove(id: NetworkId): void
    {
        if (id == InvalidNetworkId) return;
        const index: number = this._users.findIndex(user => user.id);
        if (index > -1)
        {
            this._users.splice(index, 1);
        }
    }

    public get users(): Array<User> { return this._users; }
}