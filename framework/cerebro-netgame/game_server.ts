import { ComponentSettings, Server, ServerComponent, UserSession } from "cerebro-netcore";
import { componentId } from "./component_id";
import NetworkObject from "./network_object";
import WorldUpdaterTask from "./tasks/world_updater_task";
import { UserProperty } from "./user_property";
import * as UpdateLevelRpc from "./client_rpcs/update_level_rpc";
import MoveRpc from "./server_rpcs/move_rpc";
import { NetworkId } from "cerebro-netcore";
import { NetworkObjectProperty } from "./network_object_property";
import EnemySpawnerTask from "./tasks/enemy_spawner_task";
import NetworkWorld from "./network_world";
import NetworkLevel, { NetworkLevelId } from "./network_level";
import NetworkComponent from "./network_component";

export class GameServerSettings extends ComponentSettings
{
    public mainLevel: string = "MAIN_LEVEL";
}

export default class GameServer extends ServerComponent
{
    private _world: NetworkWorld;

    public constructor(server: Server, settings: GameServerSettings = new GameServerSettings)
    {
        super(server, componentId, settings);
        this._world = new NetworkWorld;
    }

    public get settings(): GameServerSettings { return super.settings as GameServerSettings; }
    public get world(): NetworkWorld { return this._world; }

    public initialize(): boolean
    {
        this.server.rpcs.add(new MoveRpc(this._world));
        this.server.tasks.add(new WorldUpdaterTask(this, this._world));
        this.server.tasks.add(new EnemySpawnerTask(this, this._world));
        return true;
    }

    public onClientConnection(userSession: UserSession): void
    {
        userSession.data.insert(UserProperty.Level, this.settings.mainLevel);
        const level: NetworkLevel = this.world.getOrCreate(this.settings.mainLevel);

        const object: NetworkObject = level.add();
        if (object)
        {
            object.transform.position.x = 300;
            object.transform.position.y = 300;
            userSession.data.insert(UserProperty.PossessedObject, object.id);
            object.state.data.insert(NetworkObjectProperty.Animation, 'idle');
            object.state.data.insert(NetworkObjectProperty.AssetType, 'player');

            const health: NetworkComponent = object.addComponent(new NetworkComponent('health'));
            health.data.insert('max', 10);
            health.data.insert('value', 10);

            // send the level state to the user
            this.updateLevel(userSession, level);
        }
    }

    public onClientDisconnection(userSession: UserSession): void
    {
        const userLevelId: NetworkLevelId = userSession.data.as<NetworkLevelId>(UserProperty.Level);
        const level: NetworkLevel = this.world.get(userLevelId);
        if (level)
        {
            const possessedObjectId: NetworkId = userSession.data.as<NetworkId>(UserProperty.PossessedObject);
            level.remove(possessedObjectId);
        }
        console.error(`User[${userSession.user.id}] disconnected`);
    }

    public updateLevel(userSession: UserSession, level: NetworkLevel): void
    {
        const request: UpdateLevelRpc.Request = new UpdateLevelRpc.Request;
        request.levelId = level.id;
        request.level = level;

        this.server.call(userSession, UpdateLevelRpc.rpcId, request);
    }

    public broadcastUpdateLevel(level: NetworkLevel): void
    {
        const request: UpdateLevelRpc.Request = new UpdateLevelRpc.Request;
        request.levelId = level.id;
        request.level = level;

        this.server.broadcastCall(UpdateLevelRpc.rpcId, request);
    }
}