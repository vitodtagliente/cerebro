export default class Endpoint
{
    public static readonly InvalidAddress: string = '';
    public static readonly InvalidPort: number = -1;

    public constructor(_address?: string, _port?: number)
    {
        this.address = _address ? _address : Endpoint.InvalidAddress;
        this.port = _port ? _port : Endpoint.InvalidPort;
    }

    public address: string;
    public port: number;

    public get isValid() { return this.address != Endpoint.InvalidAddress && this.port != Endpoint.InvalidPort; }

    public toString(): string 
    {
        return `{address: ${this.address}, port: ${this.port}}`;
    }
}