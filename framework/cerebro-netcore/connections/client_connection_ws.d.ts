import ClientConnection from '../client_connection';
import Message from '../message';
export default class ClientConnectionWS extends ClientConnection {
    private _socket;
    constructor();
    connect(address: string, port: number): void;
    close(): void;
    send(message: any | Message): void;
}
