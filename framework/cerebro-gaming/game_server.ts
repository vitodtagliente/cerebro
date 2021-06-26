import * as dgram from 'dgram';
import Logger from 'cerebro-logger';

export type ErrorHandler = (error: Error) => void;
export type ListeningHandler = () => void;
export type MessageHandler = (message: string) => void;

enum EventType {
    Error = 'error',
    Listening = 'listening',
    Message = 'message'
}

export enum State {
    Initialized,
    Listening,
    Error
};

export default class GameServer {
    private _socket: dgram.Socket = null;
    private _state: State = State.Initialized;
    public onError: ErrorHandler = () => { };
    public onListening: ListeningHandler = () => { };
    public onMessage: MessageHandler = (message: string) => { };

    public constructor() {
        this._socket = dgram.createSocket('udp4');

        this._socket.on(EventType.Error, (error: Error) => {
            this._state = State.Error;

            Logger.error(`Fatal error, closing the socket...`);
            this.socket.close();

            console.log(error.stack);
            this.onError(error);
        });
        this._socket.on(EventType.Listening, () => {
            this._state = State.Listening;
            Logger.info(`Game Server listening at ${this.address}:${this.port}`);
            this.onListening();
        });
        this._socket.on(EventType.Message, (message: string, senderInfo: any) => {
            console.log(senderInfo);
            this.onMessage(message)
        });
    }

    private

    public listen(port: number): void {
        if (this.state == State.Initialized) {
            this._socket.bind(port);
        }
    }

    public get socket(): dgram.Socket { return this._socket; }
    public get state(): State { return this._state; }
    public get address(): String { return this.socket.address().address; }
    public get port(): number { return this.socket.address().port; }
}