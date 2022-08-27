import Database from "../database";
import Model from "./model";

export default class ModelQuery
{
    public static async all<T extends Model>(constr: { new(...args: any[]): T }, table: string): Promise<Array<T>>
    {
        return (await Database.main.table(table).find({}).toArray())
            .map(x => Model.decode(constr, x));
    }
}