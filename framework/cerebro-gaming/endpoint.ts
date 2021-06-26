export default class Endpoint
{
    public static readonly InvalidAddress: string = '';
    public static readonly InvalidPort: number = -1;

    public constructor(_address: string, _port: number)
    {
        this.address = _address;
        this.port = _port;
    }

    public address: string;
    public port: number;

    public get isValid() { return this.address != Endpoint.InvalidAddress && this.port != Endpoint.InvalidPort; }
}