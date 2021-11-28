import ClientConnection from "./client_connection";
import { NetworkProtocol } from "./network";
import ServerConnection from "./server_connection";
export default class ConnectionFactory {
    static client(protocol: NetworkProtocol): ClientConnection;
    static server(protocol: NetworkProtocol): ServerConnection;
}
