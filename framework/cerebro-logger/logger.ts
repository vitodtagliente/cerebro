import Color from './color';
import * as path from 'path';
import Stack from './stack';

/// Retrieve the current date time
/// @return - The datetime in UTC format
function getCurrentDateTime() : string
{
    return new Date().toUTCString();
}

export default class Logger
{
    public static readonly Color = Color;
    /// Log an info
    /// @param data - The data to log
    /// @param category - The category, default Info
    public static log(data, category?: string): void
    {
        const datafy: string = (typeof data === "object") ? JSON.stringify(data) : data;
        console.log(`[${Color.decorate(category || 'Info', Color.Foreground.Cyan)}] [${getCurrentDateTime()}] [${Stack.getFormatedStackTraceElement(1)}]: ${datafy}`);
    }

    /// Log a development info
    /// @param data - The data to log
    /// @param category - The category, default Dev
    public static dev(data, category?: string): void
    {
        const datafy = (typeof data === "object") ? JSON.stringify(data) : data;
        console.log(`[${Color.decorate(category || 'Dev', Color.Foreground.Magenta)}] [${getCurrentDateTime()}] [${Stack.getFormatedStackTraceElement(1)}]: ${datafy}`);
    }

    /// Log an error
    /// @param data - The data to log
    public static error(data): void
    {
        const datafy = (typeof data === "object") ? JSON.stringify(data) : data;
        console.error(`[${Color.decorate('Error', Color.Foreground.Red)}] [${getCurrentDateTime()}] [${Stack.getFormatedStackTraceElement(1)}]: ${datafy}`);
    }

    /// Log an HTTP request
    /// @param req - The HTTP Request
    /// @param logFileRequests - If true, file requests will be logged too
    public static request(req, logFileRequests): void
    {
        const ext = path.extname(req.url);
        if (ext && !logFileRequests)
        {
            return;
        }

        const data = req.method == 'POST' ? req.body : req.params;
        const datafy = JSON.stringify(data);
        console.log(`[${Color.decorate(req.method, Color.Foreground.Green)}] ` +
            `[${getCurrentDateTime()}] ` +
            `[${req.headers['user-agent']}] ` +
            `[${Stack.getFormatedStackTraceElement(1)}] ` +
            `${req.url} ` +
            `${datafy != '{}' ? datafy : ''}`
        );
    }
}