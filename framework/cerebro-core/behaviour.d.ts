import Application from './application';
import Router from './router';
export default abstract class Behaviour {
    /**
     * The application reference
     */
    private _app;
    /**
     * Constructor
     * @param app The application
     */
    constructor(app: Application);
    /**
     * Retrieve the behaviour's name
     * @return The name of the behaviour
     */
    get name(): string;
    /**
     * Retrieve the application
     * @return The application
     */
    get app(): Application;
    /**
     * Bind a method to a router callback
     * @param method The method name
     */
    bind(method: string): any;
    /**
     * Register the application behaviour
     * @param router The router
     */
    abstract register(router: Router): void;
}
