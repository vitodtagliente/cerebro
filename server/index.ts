import { Application, Controller } from 'cerebro-core';
import Logger from 'cerebro-logger';

class FooController extends Controller
{
    public register(router): void
    {
        Logger.log("foo");
    }
}

const app: Application = new Application();
app.initialize();
app.register(FooController);
app.listen(() =>
{

});