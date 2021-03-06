"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const behaviour_1 = require("./behaviour");
class Service extends behaviour_1.default {
    /**
     * Constructor
     * @param app The application
     */
    constructor(app) {
        super(app);
    }
    /**
     * Register the Service
     * @param router The application's router
     */
    register(router) {
    }
}
exports.default = Service;
//# sourceMappingURL=service.js.map