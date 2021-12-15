import { UserSession } from "cerebro-netcore";
import World from "./world";
export declare class GameManagerSettings {
    mainLevel: string;
}
export default class GameManager {
    private _settings;
    private _world;
    constructor(settings?: GameManagerSettings);
    get settings(): GameManagerSettings;
    get world(): World;
    addClient(userSession: UserSession): void;
    removeClient(userSession: UserSession): void;
}
