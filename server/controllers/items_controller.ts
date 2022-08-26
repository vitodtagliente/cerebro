import { Application, Controller, HTTP, Router } from "cerebro-core";
import ItemDefinitionModule from "../modules/item_definition_module";

export default class ItemsController extends Controller
{
    public constructor(app: Application) { super(app); }

    public register(router: Router): void
    {
        router.register('/items', HTTP.Method.GET, (req, res) =>
        {
            res.status(HTTP.StatusCode.OK).send(
                new ItemDefinitionModule().all()
            );
        });
    }
}