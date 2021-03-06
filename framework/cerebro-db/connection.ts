enum ConnectionType {
    Invalid = "null",
    MongoDB = "mongodb",
    MySQL = "mysql"
};

export default class Connection
{
    /// The type enum    
    public static readonly Type = ConnectionType;
    /// The connection instances
    private static _instances: Array<Connection> = [];

    private _name: string = "";
    private _context = null;
    private _type: ConnectionType = ConnectionType.Invalid;

    /// retrieve the connection name
    /// @return The name
    public get name()
    {
        return this._name;
    }

    /// Retrieve the context, the raw connection
    /// @return The context
    public get context()
    {
        return this._context;
    }

    /// Retrieve the type
    /// @return The type
    public get type(): ConnectionType
    {
        return this._type;
    }


    /// constructor
    /// Initialize the connection to the db
    /// @param name - The name of the connection
    /// @param type - The type of db
    /// @param connectionString - The connection string
    /// @param options - The options
    /// @param success - The success callback
    /// @param error - the error callback
    public constructor(
        name: string,
        type: ConnectionType,
        connectionString: string,
        options: object,
        success?: () => void,
        error?: (err: object) => void
    )
    {
        this._name = name;
        this._type = type;
        if (type == ConnectionType.MongoDB)
        {
            import('./mongo/connector').then(connector => {
                this._context = connector.connect(connectionString, options, success, error);
            });
            Connection._instances.push(this);
        }
        else 
        {
            throw new TypeError(`Connection of type ${type} not implemented`);
        }
    }

    /// Find a connection by name
    /// @param name The name of the connection
    /// @return The connection if exists
    public static find(name: string): Connection
    {
        let connection: Connection = Connection._instances.find((connection: Connection) =>
            {
                return connection.name == name;
            }
        );
        return connection;
    }
}