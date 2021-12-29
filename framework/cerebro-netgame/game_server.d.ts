import { ComponentSettings, Server, ServerComponent, UserSession } from "cerebro-netcore";
import NetworkWorld from "./network_world";
import NetworkLevel from "./network_level";
export declare class GameServerSettings extends ComponentSettings {
    mainLevel: string;
}
export default class GameServer extends ServerComponent {
    private _world;
    constructor(server: Server, settings?: GameServerSettings);
    get settings(): GameServerSettings;
    get world(): NetworkWorld;
    initialize(): boolean;
    onClientConnection(userSession: UserSession): void;
    onClientDisconnection(userSession: UserSession): void;
    updateLevel(userSession: UserSession, level: NetworkLevel): void;
    broadcastUpdateLevel(level: NetworkLevel): void;
}
