"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const cerebro_logger_1 = require("cerebro-logger");
class LogMiddleware extends middleware_1.default {
    run(req, res, next) {
        cerebro_logger_1.default.request(req, false);
        next();
    }
}
exports.default = LogMiddleware;
//# sourceMappingURL=log.js.map