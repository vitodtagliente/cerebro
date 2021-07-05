import Command, { CommandId } from "./command";


export default class CommandRegister
{
    private static _main: CommandRegister = null;
    public static get main(): CommandRegister { return this._main; }

    private _commands: Map<CommandId, Command>;

    public constructor()
    {
        this._commands = new Map<CommandId, Command>();
    }

    public get commands(): Map<CommandId, Command> { return this._commands; }

    public add(command: Command): void
    {
        this._commands.set(command.id, command);
    }

    public delete(commandId: CommandId): void
    {
        this._commands.delete(commandId);
    }

    public find(commandId: CommandId): Command
    {
        return this._commands.get(commandId);
    }
}