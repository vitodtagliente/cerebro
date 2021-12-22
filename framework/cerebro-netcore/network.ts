import NetworkId from "./network_id";

export enum NetworkProtocol
{
    UDP,
    WebSocket,
    W3CWebSocket
}

export type SocketId = NetworkId;
export const InvalidSocketId: SocketId = "";