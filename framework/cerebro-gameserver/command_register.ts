import { BaseCommand, CommandId, InvalidCommandId } from "./command";

export default class CommandRegister
{
    private _commands: Map<string, BaseCommand>;

    public constructor()
    {
        this._commands = new Map<CommandId, BaseCommand>();
    }

    public add(command: BaseCommand): void
    {
        this._commands.set(command.id, command);
    }

    public find(commandId: CommandId): BaseCommand
    {
        if (commandId == InvalidCommandId) return null;
        return this._commands.get(commandId);
    }
}