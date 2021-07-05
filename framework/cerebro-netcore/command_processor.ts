import Command, { CommandId } from "./command";
import CommandRegister from "./command_register";
import Message, { MessageHeader, MessageHeaderField } from "./message";

type ResponseHandler = (message: Message) => void;

export default class CommandProcessor
{
    private _register: CommandRegister;

    public constructor()
    {
        this._register = new CommandRegister;
    }

    public get register(): CommandRegister { return this._register; }

    public process(message: Message): void
    {
        if (message.header.fields.has(MessageHeaderField.Command) == false)
        {
            return;
        }

        const commandId: CommandId = message.header.fields.get(MessageHeaderField.Command);
        const command: Command = this.register.find(commandId);
        if (command == null)
        {
            console.log(`Cannot find a command ${commandId} for processing the message '${message}'`);
            return;
        }

        /*
            require response? 
            no)
            send(socket, message): void

            yes)
            send(socket, message(id:X)) 
            wait processing (timed)
            receive message(id:X)
            return response          
         */ 
    }

    public send(message: Message, callback?: ResponseHandler): boolean
    {
        if (message.header.fields.has(MessageHeaderField.Command))
        {
            // send it
            return true;
        }
        return false;
    }
}