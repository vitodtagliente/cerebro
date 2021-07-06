import ClientConnection from "./client_connection";
import { NetworkProtocol } from "./network";
import ClientConnectionWS from "./connections/client_connection_ws";
import ServerConnectionUDP from "./connections/server_connection_udp";
import ServerConnectionWS from "./connections/server_connection_ws";
import ServerConnection from "./server_connection";


export default class ConnectionFactory
{
    static client(protocol: NetworkProtocol): ClientConnection
    {
        switch (protocol)
        {
            case NetworkProtocol.UDP:
                return null;
            case NetworkProtocol.WebSockets:
                return new ClientConnectionWS();
            default:
                return null;
        }
    }

    static server(protocol: NetworkProtocol): ServerConnection
    {
        switch (protocol)
        {
            case NetworkProtocol.UDP:
                return new ServerConnectionUDP();
            case NetworkProtocol.WebSockets:
                return new ServerConnectionWS();
            default:
                return null;
        }
    }
}