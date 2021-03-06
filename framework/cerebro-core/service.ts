import Application from './application';
import Behaviour from './behaviour';

export default class Service extends Behaviour
{
    /**
     * Constructor
     * @param app The application
     */
    public constructor(app: Application)
    {
        super(app);
    }

    /**
     * Register the Service
     * @param router The application's router
     */
    public register(router: any): void
    {

    }
}