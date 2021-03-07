import * as path from 'path';

import Color from './color';
import Level from './level';
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

    /**
     * Decorate the log level
     * @param level The log level
     */
    private static decorateLevel(level: string): string
    {
        switch (level)
        {
            case Level.Debug: return Color.decorate(level, Color.Foreground.Magenta); break;
            case Level.Dev: return Color.decorate(level, Color.Foreground.Green); break;
            case Level.Error: return Color.decorate(level, Color.Foreground.Red); break;
            case Level.Info: return Color.decorate(level, Color.Foreground.Cyan); break;
            case Level.Warning: return Color.decorate(level, Color.Foreground.Yellow); break;
            default: return Color.decorate(level, Color.Foreground.Cyan); break;
        }
    }

    /**
     * Log a message
     * @param level The level log
     * @param data The data to log
     */
    public static log(level: string, data: any): void
    {
        const datafy: string = (typeof data === typeof (Object)) ? JSON.stringify(data) : data;
        console.log(`{ `
            + `"level": "${Logger.decorateLevel(level)}", `
            + `"timestamp": "${getCurrentDateTime()}", `
            + `"stack": "${Stack.getFormatedStackTraceElement(1)}", `
            + `"message": "${datafy}"`
            + ` }`
        );
    }

    /**
     * Log a dev message
     * @param data The data to log
     */
    public static dev(data: any): void
    {
        Logger.log(Level.Dev, data);
    }

    /**
     * Log an debug message
     * @param data The data to log
     */
    public static debug(data: any): void
    {
        Logger.log(Level.Debug, data);
    }

    /**
     * Log an error message
     * @param data The data to log
     */
    public static error(data: any): void
    {
        Logger.log(Level.Error, data);
    }

    /**
     * Log an info message
     * @param data The data to log
     */
    public static info(data: any): void
    {
        Logger.log(Level.Info, data);
    }

    /**
     * Log an warning message
     * @param data The data to log
     */
    public static warn(data: any): void
    {
        Logger.log(Level.Warning, data);
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
        console.log(`{ `
            + `"level": "${Color.decorate('request', Color.Foreground.Green)}", `
            + `"timestamp": "${getCurrentDateTime()}", `
            + `"stack": "${Stack.getFormatedStackTraceElement(1)}", `
            + `"agent": "${req.headers['user-agent']}", `
            + `"url": "${Color.decorate(req.url, Color.Foreground.Magenta)}", `
            + `"params": "${datafy}"`
            + ` }`
        );
    }
}