import { Task } from "cerebro-netcore";
import GameServer from "../game_server";
import NetworkWorld from "../network_world";
export default class WorldUpdaterTask extends Task {
    private _game;
    private _world;
    constructor(game: GameServer, world: NetworkWorld);
    execute(): void;
}
