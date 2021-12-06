import BaseAction, { ActionId } from "./action";
import ActionRegister from "./action_register";
import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import UserSession from "./user_session";

export default class ActionProcessor
{
    private _register: ActionRegister;

    public constructor()
    {
        this._register = new ActionRegister;
    }

    public get register(): ActionRegister { return this._register; }

    public process(userSession: UserSession, message: Message): void
    {
        if (message.header.fields.has(MessageHeaderField.Action) == false)
        {
            return;
        }

        const actionId: ActionId = message.header.fields.get(MessageHeaderField.Action);
        const action: BaseAction = this.register.find(actionId);
        if (action == null)
        {
            console.log(`Cannot find an action ${actionId} for processing the message '${message}'`);
            return;
        }

        // execute the action
        action.execute(userSession, message);
    }

    public request<RequestType>(actionId: ActionId, request: RequestType): Message
    {
        const action: BaseAction = this.register.find(actionId);
        if (action == null)
        {
            console.error(`Cannot find the action[${actionId}]`);
            return null;
        }

        // encode the request
        const message: Message = new Message;
        message.header.fields.set(MessageHeaderField.Action, actionId);
        message.body = Encoding.stringify(request);
        return message;
    }
}