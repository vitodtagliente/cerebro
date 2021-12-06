import BaseAction, { ActionId } from "./action";
export default class ActionRegister {
    private _actions;
    constructor();
    get actions(): Map<ActionId, BaseAction>;
    add(action: BaseAction): void;
    delete(actionId: ActionId): void;
    find(actionId: ActionId): BaseAction;
    has(actionId: ActionId): boolean;
}
