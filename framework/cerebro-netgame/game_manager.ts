import { UserSession } from "cerebro-netcore";
import Level from "./level";
import NetworkObject from "./network_object";
import { UserProperty } from "./user_property";
import World from "./world";

export class GameManagerSettings
{
    public mainLevel: string = "MAIN_LEVEL";
}

export default class GameManager
{
    private _settings: GameManagerSettings;
    private _world: World;

    public constructor(settings: GameManagerSettings = new GameManagerSettings)
    {
        this._settings = settings;
        this._world = new World;
    }

    public get settings(): GameManagerSettings { return this._settings; }
    public get world(): World { return this._world; }

    public addClient(userSession: UserSession): void
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

    public removeClient(userSession: UserSession): void
    {
        this.world.get(userSession.data.get(UserProperty.Level)).remove(userSession.data.get(UserProperty.PossessedObject));
    }
}