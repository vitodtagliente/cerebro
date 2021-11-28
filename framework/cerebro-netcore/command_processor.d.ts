import { CommandId, CommandResponse } from "./command";
import CommandRegister from "./command_register";
import Message from "./message";
import UserSession from "./user_session";
declare type ResponseHandler = (commandResponse: CommandResponse) => void;
export default class CommandProcessor {
    private _register;
    private _requests;
    constructor();
    get register(): CommandRegister;
    process(userSession: UserSession, message: Message): Message;
    request<RequestType>(commandId: CommandId, request: RequestType, callback: ResponseHandler): Message;
}
export {};
