"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
const path = require("path");
const stack_1 = require("./stack");
/// Retrieve the current date time
/// @return - The datetime in UTC format
function getCurrentDateTime() {
    return new Date().toUTCString();
}
class Logger {
    /// Log an info
    /// @param data - The data to log
    /// @param category - The category, default Info
    static log(data, category) {
        const datafy = (typeof data === "object") ? JSON.stringify(data) : data;
        console.log(`[${color_1.default.decorate(category || 'Info', color_1.default.Foreground.Cyan)}] [${getCurrentDateTime()}] [${stack_1.default.getFormatedStackTraceElement(1)}]: ${datafy}`);
    }
    /// Log a development info
    /// @param data - The data to log
    /// @param category - The category, default Dev
    static dev(data, category) {
        const datafy = (typeof data === "object") ? JSON.stringify(data) : data;
        console.log(`[${color_1.default.decorate(category || 'Dev', color_1.default.Foreground.Magenta)}] [${getCurrentDateTime()}] [${stack_1.default.getFormatedStackTraceElement(1)}]: ${datafy}`);
    }
    /// Log an error
    /// @param data - The data to log
    static error(data) {
        const datafy = (typeof data === "object") ? JSON.stringify(data) : data;
        console.error(`[${color_1.default.decorate('Error', color_1.default.Foreground.Red)}] [${getCurrentDateTime()}] [${stack_1.default.getFormatedStackTraceElement(1)}]: ${datafy}`);
    }
    /// Log an HTTP request
    /// @param req - The HTTP Request
    /// @param logFileRequests - If true, file requests will be logged too
    static request(req, logFileRequests) {
        const ext = path.extname(req.url);
        if (ext && !logFileRequests) {
            return;
        }
        const data = req.method == 'POST' ? req.body : req.params;
        const datafy = JSON.stringify(data);
        console.log(`[${color_1.default.decorate(req.method, color_1.default.Foreground.Green)}] ` +
            `[${getCurrentDateTime()}] ` +
            `[${req.headers['user-agent']}] ` +
            `[${stack_1.default.getFormatedStackTraceElement(1)}] ` +
            `${req.url} ` +
            `${datafy != '{}' ? datafy : ''}`);
    }
    /// Express loggin middleware, enable to log all the requests
    /// @param req - The express request
    /// @param res - The express res
    /// @param next - The express next
    static middleware(req, res, next) {
        Logger.request(req, false);
        next();
    }
}
exports.default = Logger;
Logger.Color = color_1.default;
//# sourceMappingURL=logger.js.map