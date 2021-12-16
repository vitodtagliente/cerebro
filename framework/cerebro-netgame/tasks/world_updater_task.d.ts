import { Server } from "cerebro-netcore";
import { Task } from "cerebro-netcore";
import World from "../world";
export default class WorldUpdaterTask extends Task {
    private _server;
    private _world;
    constructor(server: Server, world: World);
    execute(): void;
}
