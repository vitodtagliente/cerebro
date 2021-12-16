import { Client, ClientComponent, ComponentSettings } from "cerebro-netcore";
import { Math } from './math';
import World from "./world";
export declare class GameClientSettings extends ComponentSettings {
}
export default class GameClient extends ClientComponent {
    private _world;
    constructor(client: Client, settings?: GameClientSettings);
    get settings(): GameClientSettings;
    get world(): World;
    initialize(): boolean;
    move(transform: Math.Transform): void;
}
