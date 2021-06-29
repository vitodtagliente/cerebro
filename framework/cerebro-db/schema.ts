import Connection from './connection';
import Model from './model';

class DefinitionType
{

}

export default class Schema
{
    public static readonly Definition = DefinitionType;

    private _name: string = null;
    private _connection: Connection = null;
    private _definition: DefinitionType = null;

    /// constructor
    /// @param name - The name of the schema
    /// @param definition - The definition
    /// @param context - The raw schema
    /// @param queryType - The type of query handler
    public constructor(connection: Connection, name: string, definition: DefinitionType)
    {
        this._connection = connection;
        this._name = name;
        this._definition = definition;
    }

    /// Retrieve the name of the schema
    /// @return - The name
    public get name()
    {
        return this._name;
    }

    /// Retrieve the definition of the schema
    /// @return - The definition
    public get definition()
    {
        return this._definition;
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

    /// Find records
    /// @param condition - The condition
    /// @param search - The search options
    /// @return - The list of records that match the search
    public async find(condition: string): Promise<Array<Model>>
    {
        return [];
    }

    /// Find one record
    /// @param condition - The condition
    /// �return - The record if exists
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
    /// @param data - The data of the new record
    /// @return - The created record is succeed
    public async insert(model: Model): Promise<Model>
    {
        return model;
    }

    /// Insert a many records into the database
    /// @param recrods - The array of the new records
    /// @return - True is succeed
    public async insertMany(models: Array<Model>): Promise<Array<Model>>
    {
        return models;
    }

    /// Delete all the records
    public async deleteAll(): Promise<boolean>
    {
        return false;
    }

    /// Delete a record by id
    /// @param id - The id
    /// @return - True if succeed
    public async deleteById(id: string): Promise<boolean>
    {
        return false;
    }

    /// Delete records by ids
    /// @param ids - The list of ids
    /// @param separator - The separator character if ids is a string
    /// @return - True if succeed
    public async deleteByIds(ids: Array<string>): Promise<boolean>
    {
        return false;
    }

    /// Update by id
    /// @param id - The id of the record to update
    /// @param data - The fields to update
    /// @return - The true if succeed
    public async update(model: Model): Promise<Model>
    {
        return null;
    }

    /// Define a new Model type
    /// @param name - The name of the model
    /// @param definition - the definition of the schema
    /// @param configure - The configuration handler
    /// @return - The generated model
    static define(name, definition, configure = (model) => { })
    {
        const type = Connection.instance.type;
        if (type == Connection.Type.MongoDB)
        {
            const MongoSchema = require('./mongo/schema');
            return MongoSchema.define(name, definition, configure);
        }
        else 
        {
            assert(false, `Connection of type ${type} not implemented`);
        }
    }
}