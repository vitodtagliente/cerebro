import * as mongoose from 'mongoose';

/// Mongo connector
/// @param connectionString - The connection string
/// @param options - The options
/// @param success - The success callback
/// @param error - the error callback
export function connect(
    connectionString: string,
    options: object,
    success?: () => void,
    error?: (err: object) => void
): mongoose.Connection
{
    const db: mongoose.Connection = mongoose.connection;

    db.on('error', error);
    db.once('open', success);

    mongoose.connect(
        connectionString,
        options ||
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    );

    return db;
}