import Message from "./message";
import UserSession from "./user_session";
export declare type ActionId = string;
export declare class ActionSettings {
    requireAuthentication: boolean;
    requireUserSession: boolean;
}
export default abstract class BaseAction {
    private _id;
    private _settings;
    constructor(id: ActionId, settings: ActionSettings);
    get id(): ActionId;
    get settings(): ActionSettings;
    abstract execute(userSession: UserSession, message: Message): void;
}
export declare abstract class Action<RequestType> extends BaseAction {
    constructor(id: ActionId, settings: ActionSettings);
    execute(userSession: UserSession, message: Message): void;
    protected abstract _execute(userSession: UserSession, request: RequestType): void;
}
