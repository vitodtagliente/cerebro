import Client from "./client";
import { NetworkProtocol } from "./network";
import ClientWS from "./network/client_ws";
import ServerUDP from "./network/server_udp";
import ServerWS from "./network/server_ws";
import Server from "./server";


export default class NodeFactory
{
    static client(protocol: NetworkProtocol): Client
    {
        switch (protocol)
        {
            case NetworkProtocol.UDP:
                return null;
            case NetworkProtocol.WebSockets:
                return new ClientWS();
            default:
                return null;
        }
    }

    static server(protocol: NetworkProtocol): Server
    {
        switch (protocol)
        {
            case NetworkProtocol.UDP:
                return new ServerUDP();
            case NetworkProtocol.WebSockets:
                return new ServerWS();
            default:
                return null;
        }
    }
}