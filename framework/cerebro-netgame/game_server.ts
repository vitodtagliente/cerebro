import { ComponentSettings, Server, ServerComponent, UserSession } from "cerebro-netcore";
import { componentId } from "./componet_id";
import Level, { LevelId } from "./level";
import NetworkObject from "./network_object";
import WorldUpdaterTask from "./tasks/world_updater_task";
import { UserProperty } from "./user_property";
import World from "./world";

import * as UpdateLevelRpc from "./client_rpcs/update_level_rpc";
import MoveRpc from "./server_rpcs/move_rpc";
import { NetworkId } from "cerebro-netcore";

export class GameServerSettings extends ComponentSettings
{
    public mainLevel: string = "MAIN_LEVEL";
}

export default class GameServer extends ServerComponent
{
    private _world: World;

    public constructor(server: Server, settings: GameServerSettings = new GameServerSettings)
    {
        super(server, componentId, settings);
        this._world = new World;
    }

    public get settings(): GameServerSettings { return super.settings as GameServerSettings; }
    public get world(): World { return this._world; }

    public initialize(): boolean
    {
        this.server.rpcs.add(new MoveRpc(this._world));
        this.server.tasks.add(new WorldUpdaterTask(this, this._world));
        return true;
    }

    public onClientConnection(userSession: UserSession): void
    {
        userSession.data.insert(UserProperty.Level, this.settings.mainLevel);
        const level: Level = this.world.getOrCreate(this.settings.mainLevel);

        const object: NetworkObject = level.add();
        if (object)
        {
            userSession.data.insert(UserProperty.PossessedObject, object.id);

            // send the level state to the user
            this.updateLevel(userSession, level);
        }
    }

    public onClientDisconnection(userSession: UserSession): void
    {
        const userLevelId: LevelId = userSession.data.as<LevelId>(UserProperty.Level);
        const level: Level = this.world.get(userLevelId);
        if (level)
        {
            const possessedObjectId: NetworkId = userSession.data.as<NetworkId>(UserProperty.PossessedObject);
            level.remove(possessedObjectId);
        }
        console.error(`User[${userSession.user.id}] disconnected`);
    }

    public updateLevel(userSession: UserSession, level: Level): void
    {
        const request: UpdateLevelRpc.Request = new UpdateLevelRpc.Request;
        request.levelId = level.id;
        request.level = level;

        this.server.call(userSession, UpdateLevelRpc.rpcId, request);
    }

    public broadcastUpdateLevel(level: Level): void
    {
        const request: UpdateLevelRpc.Request = new UpdateLevelRpc.Request;
        request.levelId = level.id;
        request.level = level;

        this.server.broadcastCall(UpdateLevelRpc.rpcId, request);
    }
}