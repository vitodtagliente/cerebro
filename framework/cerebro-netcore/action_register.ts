import BaseAction, { ActionId } from "./action";

export default class ActionRegister
{
    private _actions: Map<ActionId, BaseAction>;

    public constructor()
    {
        this._actions = new Map<ActionId, BaseAction>();
    }

    public get actions(): Map<ActionId, BaseAction> { return this._actions; }

    public add(action: BaseAction): void
    {
        this._actions.set(action.id, action);
    }

    public delete(actionId: ActionId): void
    {
        this._actions.delete(actionId);
    }

    public find(actionId: ActionId): BaseAction
    {
        return this._actions.get(actionId);
    }

    public has(actionId: ActionId): boolean
    {
        return this._actions.has(actionId);
    }
}