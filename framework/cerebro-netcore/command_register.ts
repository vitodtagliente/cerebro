import BaseCommand, { CommandId } from "./command";

export default class CommandRegister
{
    private _commands: Map<CommandId, BaseCommand>;

    public constructor()
    {
        this._commands = new Map<CommandId, BaseCommand>();
    }

    public get commands(): Map<CommandId, BaseCommand> { return this._commands; }

    public add(command: BaseCommand): void
    {
        this._commands.set(command.id, command);
    }

    public delete(commandId: CommandId): void
    {
        this._commands.delete(commandId);
    }

    public find(commandId: CommandId): BaseCommand
    {
        return this._commands.get(commandId);
    }

    public has(commandId: CommandId): boolean
    {
        return this._commands.has(commandId);
    }
}