import Application from './application';

export default abstract class Behaviour
{
    /**
     * The application reference
     */
    private _app: Application = null;

    /**
     * Constructor
     * @param app The application
     */
    constructor(app: Application)
    {
        this._app = app;
    }

    /**
     * Retrieve the application
     * @return The application
     */
    public get app() { return this._app; }

    /**
     * Bind a method to a router callback
     * @param method The method name
     */
    public bind(method: string): any
    {
        return this[method].bind(this);
    }

    /**
     * Register the application behaviour
     * @param router The express router
     */
    public abstract register(router): void;
}