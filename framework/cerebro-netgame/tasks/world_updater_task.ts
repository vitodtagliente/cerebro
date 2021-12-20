import { Task, TaskSettings } from "cerebro-netcore";
import GameServer from "../game_server";
import World from "../world";

export default class WorldUpdaterTask extends Task
{
    private _server: GameServer;
    private _world: World;

    public constructor(server: GameServer, world: World)
    {
        const settings: TaskSettings = new TaskSettings;
        settings.lifetime = 0;

        super(settings);
        this._server = server;
        this._world = world;
    }

    public execute(): void
    {
        this._server.updateWorld();
    }
}