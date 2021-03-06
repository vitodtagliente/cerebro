"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Behaviour {
    /**
     * Constructor
     * @param app The application
     */
    constructor(app) {
        /**
         * The application reference
         */
        this._app = null;
        this._app = app;
    }
    /**
     * Retrieve the application
     * @return The application
     */
    get app() { return this._app; }
    /**
     * Bind a method to a router callback
     * @param method The method name
     */
    bind(method) {
        return this[method].bind(this);
    }
}
exports.default = Behaviour;
//# sourceMappingURL=behaviour.js.map