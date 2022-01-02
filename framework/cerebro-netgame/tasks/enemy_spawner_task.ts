import { Task, TaskSettings } from "cerebro-netcore";
import GameServer from "../game_server";
import NetworkComponent from "../network_component";
import NetworkLevel from "../network_level";
import { NetworkMath } from "../network_math";
import NetworkObject from "../network_object";
import { NetworkObjectProperty } from "../network_object_property";
import NetworkWorld from "../network_world";

export default class EnemySpawnerTask extends Task
{
    private _game: GameServer;
    private _world: NetworkWorld;

    public constructor(game: GameServer, world: NetworkWorld)
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
        const level: NetworkLevel = this._world.getOrCreate(this._game.settings.mainLevel);

        const object: NetworkObject = level.add();
        if (object)
        {
            object.state.data.insert(NetworkObjectProperty.AssetType, 'slime');
            object.transform.position.x = NetworkMath.random(0, 600);
            object.transform.position.y = NetworkMath.random(0, 600);

            const health: NetworkComponent = object.addComponent(new NetworkComponent('health'));
            health.data.insert('max', 10);
            health.data.insert('value', 10);
        }
    }
}