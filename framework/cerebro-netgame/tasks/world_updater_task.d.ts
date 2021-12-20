import { Task } from "cerebro-netcore";
import GameServer from "../game_server";
import World from "../world";
export default class WorldUpdaterTask extends Task {
    private _server;
    private _world;
    constructor(server: GameServer, world: World);
    execute(): void;
}
