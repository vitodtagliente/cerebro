import { Client, ClientComponent, ComponentSettings } from "cerebro-netcore";
import { NetworkMath } from "./network_math";
import NetworkWorld from "./network_world";
export declare class GameClientSettings extends ComponentSettings {
}
export default class GameClient extends ClientComponent {
    private _world;
    constructor(client: Client, settings?: GameClientSettings);
    get settings(): GameClientSettings;
    get world(): NetworkWorld;
    initialize(): boolean;
    move(transform: NetworkMath.Transform, animation: string): void;
}
