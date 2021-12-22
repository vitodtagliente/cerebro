import { Task, TaskSettings } from "cerebro-netcore";
import GameServer from "../game_server";
import Level, { LevelId } from "../level";
import { UserProperty } from "../user_property";
import World from "../world";

export default class WorldUpdaterTask extends Task
{
    private _game: GameServer;
    private _world: World;

    public constructor(game: GameServer, world: World)
    {
        const settings: TaskSettings = new TaskSettings;
        settings.lifetime = 10000; // 10s

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
            const levelId: LevelId = userSession.data.as<LevelId>(UserProperty.Level);
            const level: Level = this._world.get(levelId);
            if (level)
            {
                ++counter;
                this._game.updateLevel(userSession, level);
            }
        }
        console.error(`[${new Date()}] ${counter} updates sent...`);
    }
}