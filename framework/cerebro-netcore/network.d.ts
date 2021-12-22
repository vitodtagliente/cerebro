import NetworkId from "./network_id";
export declare enum NetworkProtocol {
    UDP = 0,
    WebSocket = 1,
    W3CWebSocket = 2
}
export declare type SocketId = NetworkId;
export declare const InvalidSocketId: SocketId;
