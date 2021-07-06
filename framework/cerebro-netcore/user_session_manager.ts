import { SocketId } from "./network";
import UserSession from "./user_session";

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
            return this._sessions.get(socketId);
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
            return this._sessions.get(socketId);
        }
        return this.create(socketId);
    }
}