import NetworkLayer, { NetworkType } from "./network_layer";


export default class NetworkLayerUDP extends NetworkLayer
{
    public constructor()
    {
        super(NetworkType.UDP);
    }
}