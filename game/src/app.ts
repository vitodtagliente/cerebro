import { Client, ClientConnection, ClientConnectionState, Encoding, Message, NetworkProtocol, UserSession } from 'cerebro-netcore';
import { GameClient, Level, Math, NetworkObject, World } from 'cerebro-netgame';

window.onload = () =>
{
    const client: Client = new Client(NetworkProtocol.W3CWebSocket);
    client.components.add(new GameClient(client));
    client.onConnection = async () =>
    {
        const game: GameClient = client.components.find("game") as GameClient;
        let transform: Math.Transform = new Math.Transform;
        transform.position.x = 6;
        game.move(transform);
    };
    client.connect('127.0.0.1', 6000);
}