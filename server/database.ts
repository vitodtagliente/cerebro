import * as mongoDB from "mongodb";

export enum DatabaseStatus
{
    Disconnected,
    Connected,
    Error
}

export enum Table
{
    Characters = "characters",
    Inventories = "inventories",
    Items = "items",
    Users = "users"
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

    public get connected(): boolean { return this._status == DatabaseStatus.Connected; }
    public get status(): DatabaseStatus { return this._status; }

    private constructor() { }

    public async connect(connectionString: string, dbname: string): Promise<DatabaseStatus>
    {
        this._conn = new mongoDB.MongoClient(connectionString);
        try
        {
            await this._conn.connect();
            this._db = this._conn.db(dbname);
            this._status = DatabaseStatus.Connected;
        }
        catch
        {
            this._status = DatabaseStatus.Error;
        }
        return this._status;
    }

    public table(name: string): mongoDB.Collection
    {
        if (this._status == DatabaseStatus.Connected)
        {
            return this._db.collection(name);
        }
        return null;
    }
}