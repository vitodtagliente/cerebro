import { ActionId } from "./action";
import ActionRegister from "./action_register";
import Message from "./message";
import UserSession from "./user_session";
export default class ActionProcessor {
    private _register;
    constructor();
    get register(): ActionRegister;
    process(userSession: UserSession, message: Message): void;
    request<RequestType>(actionId: ActionId, request: RequestType): Message;
}
