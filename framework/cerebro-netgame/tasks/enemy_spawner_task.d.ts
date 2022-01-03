import { Task } from "cerebro-netcore";
import GameServer from "../game_server";
import NetworkWorld from "../network_world";
export default class EnemySpawnerTask extends Task {
    private _game;
    private _world;
    private _counter;
    constructor(game: GameServer, world: NetworkWorld);
    execute(): void;
}
