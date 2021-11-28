import Application from './application';
import Behaviour from './behaviour';
export default class Service extends Behaviour {
    /**
     * Constructor
     * @param app The application
     */
    constructor(app: Application);
    /**
     * Register the Service
     * @param router The application's router
     */
    register(router: any): void;
}
