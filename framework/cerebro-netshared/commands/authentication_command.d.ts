import { Command, CommandId, UserSession } from 'cerebro-netcore';
export declare const commandId: CommandId;
export declare class Request {
    username: string;
}
export declare class Response {
    foo: number;
}
export default class AuthenticationCommand extends Command<Request, Response> {
    constructor();
    _execute(userSession: UserSession, request: Request): Response;
}
