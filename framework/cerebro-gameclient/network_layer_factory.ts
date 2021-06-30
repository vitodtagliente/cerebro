import NetworkLayer, { NetworkType } from "./network_layer";
import NetworkLayerWS from "./network_layers/network_layer_ws";


export default class NetworkLayerFactory 
{
    static get(type: NetworkType): NetworkLayer
    {
        switch (type)
        {
            case NetworkType.UDP:
                {
                    console.assert(false, "Not implemented");
                    return null;
                }
            case NetworkType.WebSockets:
                return new NetworkLayerWS();
            default:
                return null;
        }
    }
}