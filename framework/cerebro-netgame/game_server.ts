import { ComponentId, ComponentSettings, Server, ServerComponent, UserSession } from "cerebro-netcore";
import Level from "./level";
import NetworkObject from "./network_object";
import { UserProperty } from "./user_property";
import World from "./world";

export const componentId: ComponentId = "game";

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
        return true;
    }

    public onClientConnection(userSession: UserSession): void
    {
        userSession.data.insert(UserProperty.Level, this.settings.mainLevel);
        const level: Level = this.world.get(this.settings.mainLevel);
        if (level)
        {
            const object: NetworkObject = level.add();
            if (object)
            {
                userSession.data.insert(UserProperty.PossessedObject, object.id);
            }
        }
    }

    public onClientDisconnection(userSession: UserSession): void
    {
        this.world.get(userSession.data.get(UserProperty.Level)).remove(userSession.data.get(UserProperty.PossessedObject));
    }
}