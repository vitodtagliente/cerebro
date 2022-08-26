import { Application, Controller, HTTP, Router } from "cerebro-core";

export default class InventoryController extends Controller
{
    public constructor(app: Application) { super(app); }

    private _getItems(req, res): void
    {
        res.status(HTTP.StatusCode.OK).send("items");
    }

    public register(router: Router): void
    {
        router.register('/inventory', HTTP.Method.GET, (req, res) => this._getItems(req, res));
    }
}