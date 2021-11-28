import BaseCommand, { CommandId } from "./command";
export default class CommandRegister {
    private _commands;
    constructor();
    get commands(): Map<CommandId, BaseCommand>;
    add(command: BaseCommand): void;
    delete(commandId: CommandId): void;
    find(commandId: CommandId): BaseCommand;
    has(commandId: CommandId): boolean;
}
