import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import Behaviour from './behaviour';
import Controller from './controller';
import Endpoint from './endpoint';
import Router from './router';
import Service from './service';

import Logger from 'cerebro-logger';
import Middleware from './middleware';

import LogMiddleware from './middlewares/log';

export enum ApplicationState
{
    Uninitialized = 'uninitialized',
    Initializing = 'initializing',
    Initialized = 'initialized',
    Running = 'running',
    Stopped = 'stopped',
    Error = 'error'
}

export class DatabaseConfig {
    name?: string = process.env.connectioName || 'default';
    connection?: string = process.env.connection || 'mongodb://127.0.0.1/overdrive';
    type?: string = process.env.connectionType || 'mongodb';
}

export class ApplicationConfig {
    name?: string = 'cerebro';
    version?: number = 1.0;
    env?: string = process.env.env || "development";
    port?: number = parseInt(process.env.port) || 9000;
    secret?: string = process.env.secret || 'CEREBRO-SECRET';
    url?: string = process.env.URL || "http://localshost:9000";
    database?: Array<DatabaseConfig> = [new DatabaseConfig()];
    // allowed cross origins
    crossOrigins?: Array<string> = [
        // default React cross origin
        "http://localhost:3000"
    ]
    logRequests?: boolean = true;
};

export default class Application
{
    /// The express application
    private _context: express.Application = null;
    /// The server configuration
    private _config: ApplicationConfig = null;
    /// The state of the application
    private _state: ApplicationState = ApplicationState.Uninitialized;
    /// The HTTP server
    private _http = null;
    /// The router
    private _router: Router = null;
    /// The list of controllers
    private _controllers: Array<Controller> = [];
    /// The list of behaviours
    private _behaviours: Array<Behaviour> = [];
    /// The list of services
    private _services: Array<Service> = [];
    /// The list of endpoints
    private _endpoints: Array<any> = [];

    /**
     * constructor
     * @param config The application configuration
     */
    public constructor(config?: ApplicationConfig)
    {
        // cache the configuration
        if (config == null)
        {
            Logger.error('Using a default server configuration...');
            config = new ApplicationConfig();
        }
        this._config = config;
    }

    /**
     * Get the application context
     * @return The application context
     */
    public get context(): express.Application
    {
        return this._context;
    }

    /**
     * Get the router
     * @return The router
     */
    public get router(): Router
    {
        return this._router;
    }

    /**
     * Get the application state
     * @return The application state
     */
    public get state(): ApplicationState
    {
        return this._state;
    }

    /**
     * Initialize the server
     * @param complete The callback function to execute at the initialization completion
     */
    public initialize(complete?: () => void): void
    {
        if (this._state != ApplicationState.Uninitialized)
        {
            // server already initialized
            return;
        }

        // initialization begin
        this._state = ApplicationState.Initializing;
        // create the express application
        this._context = express();
        // initialize the router
        this._router = new Router(this._context);
        // parse application/x-www-form-urlencoded
        this._context.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        this._context.use(bodyParser.json());
        // log every request
        if (this._config.logRequests)
        {
            this.use(LogMiddleware);
        }
        // add the respond method
        // this.use(Respond);
        // allow cross origin requests        
        for (const origin of this._config.crossOrigins)
        {
            this._context.use(cors({
                origin: origin
            }));
        }
        // complete the inizialization
        this._state = ApplicationState.Initialized;

        if (complete != null)
        {
            complete();
        }
    }

    /**
     * Move the server in listen state
     * @param success The success callback
     * @param error The error callback
     */
    listen(success?: () => void, error?: (err: any) => void): ApplicationState
    {
        // make sure that the server is initialized
        if (this.state == ApplicationState.Uninitialized)
        {
            this.initialize();
        }

        if (this.state != ApplicationState.Initialized && this.state != ApplicationState.Stopped)
        {
            Logger.error(`Unable to listen, current state: ${this.state}`);
            return this.state;
        }

        // start listening 
        this._http = this._context.listen(this._config.port, () =>
        {
            success();
            Logger.info(`${Logger.Color.decorate('HTTP', Logger.Color.Foreground.Yellow)} Server listening on port ${Logger.Color.decorate(this._config.port.toString(), Logger.Color.Foreground.Magenta)}...`);
        });

        this._state = ApplicationState.Running;

        return this.state;
    }

    /**
     * Set a variable in the application
     * @param name The name of the variable
     * @param value The value of the variable
     */
    public set(name: string, value: any)
    {
        this._context.set(name, value);
    }

    /**
     * Use a middleware
     * @param middleware The middleware to use
     */
    public use<T extends Middleware>(ctor: { new(...args): T }): void
    {
        const middleware: T = new ctor();
        this._context.use(middleware.run.bind(middleware));
    }

    /**
     * Register a behaviour/controller/endpoint/service to the application
     * @param behaviour The behaviour to register
     */
    public register<T extends Behaviour>(ctor: { new(...args): T }): void
    {
        const behaviour: T = new ctor(this);

        if (behaviour instanceof Controller)
        {
            this._controllers.push(<Controller>behaviour);
        }
        else if (behaviour instanceof Service)
        {
            this._services.push(<Service>behaviour);
        }
        else if (behaviour instanceof Endpoint)
        {
            this._endpoints.push(behaviour);
        }
        else
        {
            this._behaviours.push(behaviour);
        }

        behaviour.register(this._router);
    }

    /**
     * Find a registered service
     * @param name The name of the service
     * @return The service, if exists
     */
    public service<T extends Service>(ctor: { new(...args): T }): Service
    {
        return this._services.find(service => service instanceof ctor);
    }
}