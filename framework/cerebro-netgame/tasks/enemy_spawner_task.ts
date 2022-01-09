import { NetworkId, Task, TaskSettings } from "cerebro-netcore";
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
    private _counter: number;

    public constructor(game: GameServer, world: NetworkWorld)
    {
        const settings: TaskSettings = new TaskSettings;
        settings.lifetime = 2000; // 1000 ms = 1s

        super(settings);
        this._game = game;
        this._world = world;
        this._counter = 0;
    }

    public execute(): void
    {
        console.error(`[${new Date()}] executing the enemy spawner...`);
        const level: NetworkLevel = this._world.getOrCreate(this._game.settings.mainLevel);

        if (this._counter < 12)
        {
            const object: NetworkObject = level.add();
            if (object)
            {
                object.state.data.insert(NetworkObjectProperty.Asset, 'slime');
                object.transform.position.x = NetworkMath.random(0, 600);
                object.transform.position.y = NetworkMath.random(0, 600);

                const health: NetworkComponent = object.addComponent(new NetworkComponent('health'));
                health.data.insert('max', 10);
                health.data.insert('value', 10);

                const animator: NetworkComponent = object.addComponent(new NetworkComponent('sprite_animator'));
                animator.data.insert('animation', 'idle');

                this._counter++;
            }
        }

        const test: boolean = true;
        if (test && level.objects.size > 0)
        {
            const keys = Array.from(level.objects.keys());
            const index: number = Math.round(NetworkMath.random(0, keys.length - 1));
            const obj: NetworkObject = level.objects.get(keys[index]);
            const health: NetworkComponent = obj.getComponent('health');
            if (health)
            {
                const value: number = health.data.asNumber('value');
                if (value > 1)
                {
                    health.data.insert('value', value - 1);
                }
            }
        }
    }
}