import { Server } from "cerebro-netcore";
import { Task } from "cerebro-netcore";
import World from "../world";

export default class WorldUpdaterTask extends Task
{
    private _server: Server;
    private _world: World;

    public constructor(server: Server, world: World)
    {
        super();
        this._server = server;
        this._world = world;
    }

    public execute(): void
    {

    }
}