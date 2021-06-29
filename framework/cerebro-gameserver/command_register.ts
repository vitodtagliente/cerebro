import Command, { CommandId } from "./command";

export default class CommandRegister
{
    private _commands: Map<string, Command>;

    public constructor()
    {
        this._commands = new Map<CommandId, Command>();
    }

    public add(command: Command): void 
    {
        this._commands.set(command.id, command);
    }

    public find(commandId: CommandId): Command
    {
        if (commandId == Command.InvalidCommandId) return null;
        return this._commands[commandId];
    }
}