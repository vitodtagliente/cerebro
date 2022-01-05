export default abstract class Serializable
{
    public abstract deserialize(data: any): void;
    public abstract serialize(): any;
}