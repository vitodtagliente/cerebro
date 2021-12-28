import { Task, TaskSettings } from "cerebro-netcore";
import GameServer from "../game_server";
import Level from "../level";
import { Math } from "../math";
import NetworkObject from "../network_object";
import { NetworkObjectProperty } from "../network_object_property";
import World from "../world";

export default class EnemySpawnerTask extends Task
{
    private _game: GameServer;
    private _world: World;

    public constructor(game: GameServer, world: World)
    {
        const settings: TaskSettings = new TaskSettings;
        settings.lifetime = 2000; // 1000 ms = 1s

        super(settings);
        this._game = game;
        this._world = world;
    }

    public execute(): void
    {
        console.error(`[${new Date()}] executing the enemy spawner...`);
        const level: Level = this._world.getOrCreate(this._game.settings.mainLevel);

        const object: NetworkObject = level.add();
        if (object)
        {
            object.state.data.insert(NetworkObjectProperty.MaxHp, 100);
            object.state.data.insert(NetworkObjectProperty.Hp, 100);
            object.state.data.insert(NetworkObjectProperty.AssetType, 'slime');

            object.transform.position.x = Math.random(0, 600);
            object.transform.position.y = Math.random(0, 600);
        }
    }
}