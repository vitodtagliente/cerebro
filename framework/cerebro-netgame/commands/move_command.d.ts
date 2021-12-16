import { Command, CommandId, UserSession } from 'cerebro-netcore';
import { Math } from '../math';
import World from '../world';
export declare const commandId: CommandId;
export declare class Request {
    level: string;
    transform: Math.Transform;
}
export default class MoveCommand extends Command<Request, void> {
    private _world;
    constructor(world: World);
    _execute(userSession: UserSession, request: Request): void;
}
