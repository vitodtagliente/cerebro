"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
class Respond extends middleware_1.default {
    run(req, res, next) {
        /**
        * Inject a new method into the express response
        * Reply with a json response
        * @param status The status code
        * @param data The json data to send
        **/
        // res.respond = (status: number, data: object = {}) =>
        // {
        //     res.status(status).json(data);
        // };
        next();
    }
}
exports.default = Respond;
//# sourceMappingURL=respond.js.map