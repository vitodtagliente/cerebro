import Database from "../database";
import Model from "./model";

export default class ModelQuery
{
    public static async all<T extends Model>(constr: { new(...args: any[]): T }, table: string): Promise<Array<T>>
    {
        const result: Array<T> = [];
        const entries = await Database.main.table(table).find({}).toArray();
        for (const entry of entries)
        {
            result.push(Model.decode(constr, entry));
        }
        return result;
    }
}