import NetworkLayer, { NetworkType } from "./network_layer";
import NetworkLayerUDP from "./network_layers/network_layer_udp";
import NetworkLayerWS from "./network_layers/network_layer_ws";


export default class NetworkLayerFactory 
{
    static get(type: NetworkType): NetworkLayer
    {
        switch (type)
        {
            case NetworkType.UDP:
                return new NetworkLayerUDP();
            case NetworkType.WebSockets:
                return new NetworkLayerWS();
            default:
                return null;
        }
    }
}