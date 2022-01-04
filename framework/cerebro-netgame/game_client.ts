import { Client, ClientComponent, ComponentSettings } from "cerebro-netcore";
import { componentId } from "./component_id";

import * as MoveRpc from "./server_rpcs/move_rpc";
import UpdateLevelRpc from "./client_rpcs/update_level_rpc";
import { NetworkMath } from "./network_math";
import NetworkWorld from "./network_world";

export class GameClientSettings extends ComponentSettings
{

}

export default class GameClient extends ClientComponent
{
    private _world: NetworkWorld;

    public constructor(client: Client, settings: GameClientSettings = new GameClientSettings)
    {
        super(client, componentId, settings);
        this._world = new NetworkWorld;
    }

    public get settings(): GameClientSettings { return super.settings as GameClientSettings; }
    public get world(): NetworkWorld { return this._world; }

    public initialize(): boolean
    {
        this.client.rpcs.add(new UpdateLevelRpc(this._world));
        return true;
    }

    public move(transform: NetworkMath.Transform, animation: string): void
    {
        const request: MoveRpc.Request = new MoveRpc.Request;
        request.animation = animation;
        request.transform = transform;
        request.level = "MAIN_LEVEL";

        this.client.call(MoveRpc.rpcId, request);
    }
}