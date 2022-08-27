import Database from "../database";
import Model from "./model";

export default class ModelQuery
{
    public static async all<T extends Model>(constr: { new(...args: any[]): T }, table: string): Promise<Array<T>>
    {
        return (await Database.main.table(table).find({}).toArray())
            .map(x => Model.decode(constr, x));
    }

    public static async find<T extends Model>(constr: { new(...args: any[]): T }, table: string, filter: any): Promise<Array<T>>
    {
        return (await Database.main.table(table).find(filter).toArray())
            .map(x => Model.decode(constr, x));
    }

    public static async findById<T extends Model>(constr: { new(...args: any[]): T }, table: string, id: string): Promise<T>
    {
        return Model.decode(constr, await Database.main.table(table).find({ _id: id }));
    }
}