import Message from "./message";
import UserSession from "./user_session";
export declare type CommandId = string;
export declare enum CommandPhase {
    Request = "request",
    Response = "response"
}
export declare class CommandSettings {
    requireAuthentication: boolean;
    requireResponse: boolean;
    requireUserSession: boolean;
}
export declare class CommandResponse {
    statusCode: number;
    data: string;
    constructor(statusCode?: number, data?: string);
}
export default abstract class BaseCommand {
    private _id;
    private _settings;
    constructor(id: CommandId, settings: CommandSettings);
    get id(): CommandId;
    get settings(): CommandSettings;
    abstract execute(userSession: UserSession, message: Message): CommandResponse;
}
export declare abstract class Command<RequestType, ResponseType> extends BaseCommand {
    constructor(id: CommandId, settings: CommandSettings);
    execute(userSession: UserSession, message: Message): CommandResponse;
    protected abstract _execute(userSession: UserSession, request: RequestType): ResponseType;
}
