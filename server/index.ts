import { Application } from "cerebro-core";
import HomeController from "./controllers/home_controller";
import InventoryController from "./controllers/inventory_controller";

const app: Application = new Application();
app.initialize();
app.register(HomeController);
app.register(InventoryController);
app.listen(() =>
{

});