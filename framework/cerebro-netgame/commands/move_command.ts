import { Encoding } from 'cerebro-netcore';
import { Command, CommandId, CommandSettings, InvalidNetworkId, NetworkId, UserSession } from 'cerebro-netcore';
import Level from '../level';
import { Math } from '../math';
import NetworkObject from '../network_object';
import { UserProperty } from '../user_property';
import World from '../world';

export const commandId: CommandId = "move";

export class Request
{
    public level: string;
    public transform: Math.Transform;
}

export default class MoveCommand extends Command<Request, void>
{
    private _world: World;

    public constructor(world: World)
    {
        const settings: CommandSettings = new CommandSettings;
        settings.requireAuthentication = false;
        settings.requireResponse = false;
        settings.requireUserSession = true;

        super(commandId, settings);

        this._world = world;
    }

    public _execute(userSession: UserSession, request: Request): void
    {
        const level: Level = this._world.get(request.level);
        if (level == null)
        {
            console.error(`user[${userSession.user.id}] is moving into a not valid level[${request.level}]`);
            return;
        }

        const objectId: NetworkId = userSession.data.as<NetworkId>(UserProperty.PossessedObject);
        if (objectId == InvalidNetworkId)
        {
            console.error(`user[${userSession.user.id}] does not have a valid possessed game object`);
            return;
        }

        const possessedObject: NetworkObject = level.get(objectId);
        if (possessedObject == null)
        {
            console.error(`user[${userSession.user.id}] - cannot find the object[${objectId}]`);
            return;
        }

        possessedObject.transform = request.transform;
        console.error(`user[${userSession.user.id}] - moved to [${Encoding.stringify(possessedObject.transform)}]`);
    }
}