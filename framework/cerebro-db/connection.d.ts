export declare enum ConnectionType {
    Invalid = "null",
    MongoDB = "mongodb",
    MySQL = "mysql"
}
export default class Connection {
    static readonly Type: typeof ConnectionType;
    private static _instances;
    private _name;
    private _context;
    private _type;
    get name(): string;
    get context(): any;
    get type(): ConnectionType;
    /**
     * constructor
     * Initialize the connection to the db
     * @param name The name of the connection
     * @param type The type of DB
     * @param connectionString The connection string
     * @param options The options
     * @param success The success callback
     * @param error The error callback
     */
    constructor(name: string, type: ConnectionType, connectionString: string, options: object, success?: () => void, error?: (err: object) => void);
    /**
     * Find a connection by name
     * @param name The name of the connection
     * @return The connection if exists
     */
    static find(name: string): Connection;
}
