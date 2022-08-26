import Color from './color';
export default class Logger {
    static readonly Color: typeof Color;
    /**
     * Decorate the log level
     * @param level The log level
     * @return The decorated level
     */
    private static decorateLevel;
    /**
     * Log a message
     * @param level The level log
     * @param data The data to log
     */
    static log(level: string, data: any): void;
    /**
     * Log a dev message
     * @param data The data to log
     */
    static dev(data: any): void;
    /**
     * Log an debug message
     * @param data The data to log
     */
    static debug(data: any): void;
    /**
     * Log an error message
     * @param data The data to log
     */
    static error(data: any): void;
    /**
     * Log an info message
     * @param data The data to log
     */
    static info(data: any): void;
    /**
     * Log an warning message
     * @param data The data to log
     */
    static warn(data: any): void;
    /**
     * Log the http requests
     * @param req The http request
     * @param logFileRequests If true, file requests will be logged too
     */
    static request(req: any, logFileRequests: any): void;
}
