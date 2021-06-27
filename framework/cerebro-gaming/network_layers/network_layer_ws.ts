import * as dgram from 'dgram';
import Logger from 'cerebro-logger';
import NetworkLayer, { NetworkState, NetworkType } from '../network_layer';
import Encoding from '../encoding';
import Endpoint from '../endpoint';

enum EventType
{
    Error = 'error',
    Listening = 'listening',
    Message = 'message'
}

export default class NetworkLayerWS extends NetworkLayer
{

    public constructor()
    {
        super(NetworkType.WebSockets);


    }

    public listen(port: number): void 
    {
        if (this.state == NetworkState.Initialized)
        {

        }
    }
}