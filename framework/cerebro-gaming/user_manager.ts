import NetworkId, { InvalidNetworkId } from "./network_id";
import User from "./user";

export default class UserManager
{
    private static _idCounter: number = 0;

    private static _main: UserManager;
    public static get main() { return UserManager._main; }

    private _users: Map<NetworkId, User>;

    public constructor()
    {
        UserManager._main = this;
        this._users = new Map<NetworkId, User>();
    }

    public add(socketId: NetworkId, user: User): boolean
    {
        if (user.id == InvalidNetworkId) return false;

        if (this._users.has(socketId))
        {
            return false;
        }

        this._users.set(socketId, user);
        return true;
    }

    public find(socketId: NetworkId): User
    {
        if (socketId == InvalidNetworkId) return null;
        return this._users[socketId];
    }

    public remove(socketId: NetworkId): void
    {
        if (socketId == InvalidNetworkId) return;
        this._users.delete(socketId);
    }

    public get users(): Map<NetworkId, User> { return this._users; }
}