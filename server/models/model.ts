export default abstract class Model
{
    private _id: string;

    public get id(): string { return this._id; }

    public static decode<T extends Model>(constr: { new(...args: any[]): T }, data: any): T
    {
        const model = Object.assign(new constr, data) as T;
        model._id = model._id.toString();
        return model;
    }
}