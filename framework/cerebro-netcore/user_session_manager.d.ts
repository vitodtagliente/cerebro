import { SocketId } from "./network";
import UserSession from "./user_session";
export default class UserSessionManager {
    private static _main;
    static get main(): UserSessionManager;
    private _sessions;
    constructor();
    create(socketId: SocketId): UserSession;
    destroy(socketId: SocketId): void;
    get(socketId: SocketId): UserSession;
}
