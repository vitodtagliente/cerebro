import * as mongoDB from "mongodb";

export enum DatabaseStatus
{
    Disconnected,
    Connected
}

export default class Database
{
    private static _main: Database = null;
    public static get main(): Database
    {
        if (Database._main == null)
        {
            Database._main = new Database();
        }
        return Database._main;
    }

    private _conn: mongoDB.MongoClient = null;
    private _db: mongoDB.Db = null;
    private _status: DatabaseStatus = DatabaseStatus.Disconnected;

    public get status(): DatabaseStatus { return this._status; }

    private constructor() { }

    public async connect(connectionString: string, dbname: string): Promise<boolean>
    {
        this._conn = new mongoDB.MongoClient(connectionString);
        try
        {
            await this._conn.connect();
            this._db = this._conn.db(dbname);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public collection(name: string): mongoDB.Collection
    {
        return this._db.collection(name);
    }
}