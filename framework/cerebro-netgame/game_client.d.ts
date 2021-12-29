import { Client, ClientComponent, ComponentSettings } from "cerebro-netcore";
import { Math } from './math';
import NetworkWorld from "./network_world";
export declare class GameClientSettings extends ComponentSettings {
}
export default class GameClient extends ClientComponent {
    private _world;
    private _shadowWorld;
    constructor(client: Client, settings?: GameClientSettings);
    get settings(): GameClientSettings;
    get world(): NetworkWorld;
    initialize(): boolean;
    move(transform: Math.Transform): void;
}
