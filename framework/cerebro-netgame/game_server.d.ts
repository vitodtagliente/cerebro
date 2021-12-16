import { ComponentSettings, Server, ServerComponent, UserSession } from "cerebro-netcore";
import World from "./world";
export declare class GameServerSettings extends ComponentSettings {
    mainLevel: string;
}
export default class GameServer extends ServerComponent {
    private _world;
    constructor(server: Server, settings?: GameServerSettings);
    get settings(): GameServerSettings;
    get world(): World;
    initialize(): boolean;
    onClientConnection(userSession: UserSession): void;
    onClientDisconnection(userSession: UserSession): void;
}
