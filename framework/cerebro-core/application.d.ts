import * as express from 'express';
import Behaviour from './behaviour';
import Router from './router';
import Service from './service';
import Middleware from './middleware';
export declare enum ApplicationState {
    Uninitialized = "uninitialized",
    Initializing = "initializing",
    Initialized = "initialized",
    Running = "running",
    Stopped = "stopped",
    Error = "error"
}
export declare class DatabaseConfig {
    name?: string;
    connection?: string;
    type?: string;
}
export declare class ApplicationConfig {
    name?: string;
    version?: number;
    env?: string;
    port?: number;
    secret?: string;
    url?: string;
    database?: DatabaseConfig;
    crossOrigins?: Array<string>;
    logRequests?: boolean;
}
export default class Application {
    private _context;
    private _config;
    private _state;
    private _http;
    private _router;
    private _controllers;
    private _behaviours;
    private _services;
    private _endpoints;
    /**
     * constructor
     * @param config The application configuration
     */
    constructor(config?: ApplicationConfig);
    /**
     * Get the application context
     * @return The application context
     */
    get context(): express.Application;
    /**
     * Get the router
     * @return The router
     */
    get router(): Router;
    /**
     * Get the application state
     * @return The application state
     */
    get state(): ApplicationState;
    /**
     * Initialize the server
     * @param complete The callback function to execute at the initialization completion
     */
    initialize(complete?: () => void): void;
    /**
     * Move the server in listen state
     * @param success The success callback
     * @param error The error callback
     */
    listen(success?: () => void, error?: (err: any) => void): ApplicationState;
    /**
     * Set a variable in the application
     * @param name The name of the variable
     * @param value The value of the variable
     */
    set(name: string, value: any): void;
    /**
     * Use a middleware
     * @param middleware The middleware to use
     */
    use<T extends Middleware>(ctor: {
        new (...args: any[]): T;
    }): void;
    /**
     * Register a behaviour/controller/endpoint/service to the application
     * @param behaviour The behaviour to register
     */
    register<T extends Behaviour>(ctor: {
        new (...args: any[]): T;
    }): void;
    /**
     * Find a registered service
     * @param name The name of the service
     * @return The service, if exists
     */
    service<T extends Service>(ctor: {
        new (...args: any[]): T;
    }): Service;
}
