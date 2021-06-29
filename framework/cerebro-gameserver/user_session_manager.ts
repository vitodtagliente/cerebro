import { SocketId } from "./network_layer";
import User from "./user";

export class UserSession
{
    public constructor()
    {
        this.authenticated = true;
        this.user = new User;
        this.data = new Map<string, string>();
    }

    public authenticated: boolean;
    public user: User;
    public data: Map<string, string>;
}

export default class UserSessionManager
{
    private static _main: UserSessionManager = null;
    public static get main(): UserSessionManager { return UserSessionManager._main; }

    private _sessions: Map<SocketId, UserSession>;

    public constructor()
    {
        this._sessions = new Map<SocketId, UserSession>();
    }

    public create(socketId: SocketId): UserSession
    {
        if (this._sessions.has(socketId))
        {
            return this._sessions[socketId];
        }

        const session: UserSession = new UserSession;
        this._sessions.set(socketId, session);
        return session;
    }

    public destroy(socketId: SocketId): void
    {
        this._sessions.delete(socketId);
    }

    public get(socketId: SocketId): UserSession
    {
        if (this._sessions.has(socketId))
        {
            return this._sessions[socketId];
        }
        return this.create(socketId);
    }
}