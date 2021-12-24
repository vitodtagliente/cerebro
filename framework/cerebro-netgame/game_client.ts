import { Client, ClientComponent, ComponentId, ComponentSettings, UserSession } from "cerebro-netcore";
import { componentId } from "./componet_id";
import { Math } from './math';
import World from "./world";

import * as MoveRpc from "./server_rpcs/move_rpc";
import UpdateLevelRpc from "./client_rpcs/update_level_rpc";

export class GameClientSettings extends ComponentSettings
{

}

export default class GameClient extends ClientComponent
{
    private _world: World;
    private _shadowWorld: World;

    public constructor(client: Client, settings: GameClientSettings = new GameClientSettings)
    {
        super(client, componentId, settings);
        this._world = new World;
    }

    public get settings(): GameClientSettings { return super.settings as GameClientSettings; }
    public get world(): World { return this._world; }

    public initialize(): boolean
    {
        this.client.rpcs.add(new UpdateLevelRpc(this._world));
        return true;
    }

    public move(transform: Math.Transform): void
    {
        const request: MoveRpc.Request = new MoveRpc.Request;
        request.transform = transform;
        request.level = "MAIN_LEVEL";

        this.client.call(MoveRpc.rpcId, request);
    }
}