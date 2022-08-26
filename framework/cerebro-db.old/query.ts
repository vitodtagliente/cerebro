import Connection from './connection';
import Model from './model';

export default class Query
{
    private _connection: Connection = null;

    /// constructor
    /// @param connection The connection
    constructor(connection: Connection)
    {
        this._connection = connection;
    }

    /// Retrieve the context
    /// @return The connection
    public get connection()
    {
        return this._connection;
    }

    /// Retrieve all the records
    /// @return - The list of records
    public async all(): Promise<Array<Model>>
    {
        return [];
    }

    /// Retrive the number of records
    /// @param condition - The condition
    /// @return - The count
    public async count(condition: string): Promise<number>
    {
        return 0;
    }

    public async find(condition: string): Promise<Array<Model>>
    {
        return [];
    }

    /// Find records
    /// @param condition - The condition
    /// @param search - The search options
    /// @return - The list of records that match the search
    public async findOne(condition: string): Promise<Model>
    {
        return null;
    }

    /// Find a record by id
    /// @param id - The id
    /// @return - The record if exists
    public async findById(id: string): Promise<Model>
    {
        return null;
    }

    /// Find records by ids
    /// @param ids - the set of ids
    /// @return -  The list of records if exist
    public async findByIds(ids: Array<string>): Promise<Array<Model>>
    {
        return [];
    }

    /// Insert a new record into the database
    /// @param model - The data of the new record
    /// @return - The created record is succeed
    public async insert(model: Model)
    {
        return false;
    }

    /// Insert a many records into the database
    /// @param recrods - The array of the new records
    /// @return - True is succeed
    async insertMany(records)
    {
        return false;
    }

    /// Delete all the records
    async deleteAll()
    {
        return false;
    }

    /// Delete a record by id
    /// @param id - The id
    /// @return - True if succeed
    async deleteById(id)
    {
        return false;
    }

    /// Delete records by ids
    /// @param ids - The list of ids
    /// @param separator - The separator character if ids is a string
    /// @return - True if succeed
    async deleteByIds(ids = Array(), separator = ',')
    {
        return false;
    }

    /// Update by id
    /// @param id - The id of the record to update
    /// @param data - The fields to update
    /// @return - True if succeed
    async update(id, data)
    {
        return null;
    }
}

module.exports = Query;