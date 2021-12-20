import Message from '../message';
import { SocketId } from '../network';
import ServerConnection from '../server_connection';
export default class ServerConnectionWS extends ServerConnection {
    private _clients;
    private _http;
    private _socket;
    constructor();
    listen(port: number): void;
    close(): void;
    broadcast(message: any | Message): void;
    send(socketId: SocketId, message: any | Message): void;
}
