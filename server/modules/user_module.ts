import { Table } from "../database";
import ModelQuery from "../models/model_query";
import User from "../models/user";

export default class UserModule
{
    public async all(): Promise<Array<User>>
    {
        return ModelQuery.all(User, Table.Users);
    }
}