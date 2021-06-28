import User from "./user";
import { SocketId } from "./network_layer";

export default class UserManager
{
    private static _main: UserManager;
    public static get main() { return UserManager._main; }

    private _users: Map<SocketId, User>;

    public constructor()
    {
        UserManager._main = this;
        this._users = new Map<SocketId, User>();
    }

    public add(socketId: SocketId, user: User): void
    {
        if (this._users.has(socketId) == false)
        {
            this._users.set(socketId, user);
        }
    }

    public find(socketId: SocketId): User
    {
        return this._users[socketId];
    }

    public remove(socketId: SocketId): void
    {
        this._users.delete(socketId);
    }

    public get users(): Map<SocketId, User> { return this._users; }
}