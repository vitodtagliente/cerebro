import { InvalidSocketId, SocketId } from "./network";
import UserSession from "./user_session";

export default class UserSessionManager
{
    private static _main: UserSessionManager = null;
    public static get main(): UserSessionManager { return UserSessionManager._main; }

    private _sessions: Map<SocketId, UserSession>;

    public get sessions(): IterableIterator<UserSession> { return this._sessions.values(); }

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

    public getSocketId(userSession: UserSession): SocketId
    {
        for (const [socketId, session] of this._sessions)
        {
            if (session.id == userSession.id)
            {
                return socketId;
            }
        }
        return InvalidSocketId;
    }
}