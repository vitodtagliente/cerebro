import Command, { CommandId } from "./command";
import Message from "./message";
import { User } from "./user_manager";

export default class CommandRegister
{
    private _commands: Map<string, Command>;

    public constructor()
    {
        this._commands = new Map<CommandId, Command>();
    }

    public add(command: Command): void 
    {

    }

    public find(commandId: CommandId): Command
    {
        if (commandId == Command.InvalidCommandId) return null;
        return this._commands[commandId];
    }

    public execute(user: User, message: Message): void 
    {
        
    }
}