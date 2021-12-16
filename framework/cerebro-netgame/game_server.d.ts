import { ComponentId, UserSession } from "cerebro-netcore";
import World from "./world";
export declare const componentId: ComponentId;
export declare class GameServerSettings {
    mainLevel: string;
}
export default class GameServer {
    private _settings;
    private _world;
    constructor(settings?: GameServerSettings);
    get settings(): GameServerSettings;
    get world(): World;
    addClient(userSession: UserSession): void;
    removeClient(userSession: UserSession): void;
}
