import { Application, Controller, HTTP, Router } from "cerebro-core";

export default class HomeController extends Controller
{
    public constructor(app: Application) { super(app); }

    public register(router: Router): void
    {
        router.register('/', HTTP.Method.GET, (req, res) =>
        {
            res.status(HTTP.StatusCode.OK).send("Hello World");
        });
    }
}