import { Task, TaskSettings } from "cerebro-netcore";
import GameServer from "../game_server";
import NetworkLevel, { NetworkLevelId } from "../network_level";
import NetworkWorld from "../network_world";
import { UserProperty } from "../user_property";

export default class WorldUpdaterTask extends Task
{
    private _game: GameServer;
    private _world: NetworkWorld;

    public constructor(game: GameServer, world: NetworkWorld)
    {
        const settings: TaskSettings = new TaskSettings;
        settings.lifetime = 16; // 16 ms = 60 fps or 33 ms = 30 fps

        super(settings);
        this._game = game;
        this._world = world;
    }

    public execute(): void
    {
        console.error(`[${new Date()}] executing the world updater...`);
        let counter: number = 0;
        for (const userSession of this._game.server.userSessionManager.sessions)
        {
            const levelId: NetworkLevelId = userSession.data.as<NetworkLevelId>(UserProperty.Level);
            const level: NetworkLevel = this._world.get(levelId);
            if (level)
            {
                ++counter;
                this._game.updateLevel(userSession, level);
            }
        }
        console.error(`[${new Date()}] ${counter} updates sent...`);
    }
}