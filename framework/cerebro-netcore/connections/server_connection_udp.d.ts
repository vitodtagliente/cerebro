import Message from '../message';
import { SocketId } from '../network';
import ServerConnection from '../server_connection';
export default class ServerConnectionUDP extends ServerConnection {
    private _socket;
    private _clients;
    constructor();
    listen(port: number): void;
    close(): void;
    broadcast(message: any | Message): void;
    send(socketId: SocketId, message: any | Message): void;
}
