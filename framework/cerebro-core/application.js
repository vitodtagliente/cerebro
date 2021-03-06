"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const controller_1 = require("./controller");
const service_1 = require("./service");
const cerebro_logger_1 = require("cerebro-logger");
const log_1 = require("./middlewares/log");
var ApplicationState;
(function (ApplicationState) {
    ApplicationState["Uninitialized"] = "uninitialized";
    ApplicationState["Initializing"] = "initializing";
    ApplicationState["Initialized"] = "initialized";
    ApplicationState["Running"] = "running";
    ApplicationState["Stopped"] = "stopped";
    ApplicationState["Error"] = "error";
})(ApplicationState || (ApplicationState = {}));
class DatabaseConfig {
    constructor() {
        this.name = process.env.connectioName || 'default';
        this.connection = process.env.connection || 'mongodb://127.0.0.1/overdrive';
        this.type = process.env.connectionType || 'mongodb';
    }
}
class ApplicationConfig {
    constructor() {
        this.name = 'cerebro';
        this.version = 1.0;
        this.env = process.env.env || "development";
        this.port = parseInt(process.env.port) || 9000;
        this.secret = process.env.secret || 'CEREBRO-SECRET';
        this.url = process.env.URL || "http://localshost:9000";
        this.database = [new DatabaseConfig()];
        // allowed cross origins
        this.crossOrigins = [
            // default React cross origin
            "http://localhost:3000"
        ];
    }
}
;
class Application {
    /**
     * constructor
     * @param config The application configuration
     */
    constructor(config) {
        /// The express application
        this._context = null;
        /// The server configuration
        this._config = null;
        /// The state of the application
        this._state = ApplicationState.Uninitialized;
        /// HTTP server
        this._http = null;
        /// The list of controllers
        this._controllers = [];
        /// The list of behaviours
        this._behaviours = [];
        /// The list of services
        this._services = [];
        // cache the configuration
        if (config == null) {
            cerebro_logger_1.default.error('Using a default server configuration...');
            config = new ApplicationConfig();
        }
        this._config = config;
    }
    /**
     * Get the application context
     * @return The application context
     */
    get context() {
        return this._context;
    }
    /**
     * Get the application state
     * @return The application state
     */
    get state() {
        return this._state;
    }
    /**
     * Initialize the server
     * @param complete The callback function to execute at the initialization completion
     */
    initialize(complete) {
        if (this._state != ApplicationState.Uninitialized) {
            // server already initialized
            return;
        }
        // initialization begin
        this._state = ApplicationState.Initializing;
        // create the express application
        this._context = express();
        // parse application/x-www-form-urlencoded
        this._context.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        this._context.use(bodyParser.json());
        // log every request
        this.use(new log_1.default());
        // add the respond method
        // this.use(Respond);
        // allow cross origin requests        
        for (const origin of this._config.crossOrigins) {
            this._context.use(cors({
                origin: origin
            }));
        }
        // complete the inizialization
        this._state = ApplicationState.Initialized;
        if (complete != null) {
            complete();
        }
    }
    /**
     * Move the server in listen state
     * @param success The success callback
     * @param error The error callback
     */
    listen(success, error) {
        // make sure that the server is initialized
        if (this.state == ApplicationState.Uninitialized) {
            this.initialize();
        }
        if (this.state != ApplicationState.Initialized && this.state != ApplicationState.Stopped) {
            cerebro_logger_1.default.error(`Unable to listen, current state: ${this.state}`);
            return this.state;
        }
        // start listening 
        this._http = this._context.listen(this._config.port, () => {
            success();
            cerebro_logger_1.default.log(`${cerebro_logger_1.default.Color.decorate('HTTP', cerebro_logger_1.default.Color.Foreground.Yellow)} Server listening on port ${cerebro_logger_1.default.Color.decorate(this._config.port.toString(), cerebro_logger_1.default.Color.Foreground.Magenta)}...`);
        });
        this._state = ApplicationState.Running;
        return this.state;
    }
    /**
     * Set a variable in the application
     * @param name The name of the variable
     * @param value The value of the variable
     */
    set(name, value) {
        this._context.set(name, value);
    }
    /**
     * Use a middleware
     * @param middleware The middleware to use
     */
    use(middleware) {
        this._context.use(middleware.run.bind(middleware));
    }
    /**
     * Register a behaviour/controller/service to the application
     * @param behaviour The behaviour to register
     */
    register(ctor) {
        const behaviour = new ctor(this);
        if (behaviour instanceof controller_1.default) {
            this._controllers.push(behaviour);
        }
        else if (behaviour instanceof service_1.default) {
            this._services.push(behaviour);
        }
        else {
            this._behaviours.push(behaviour);
        }
        behaviour.register(this._context);
    }
    /**
     * Find a registered service
     * @param name The name of the service
     * @return The service, if exists
     */
    service(ctor) {
        for (const service of this._services) {
            if (typeof (service) == typeof (ctor)) {
                return service;
            }
        }
        return null;
    }
}
exports.default = Application;
//# sourceMappingURL=application.js.map