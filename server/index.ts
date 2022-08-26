import { Application } from "cerebro-core";
import HomeController from "./controllers/home_controller";
import InventoryController from "./controllers/inventory_controller";
import ItemsController from "./controllers/items_controller";
import ItemDefinitionModule from "./modules/item_definition_module";

const app: Application = new Application();
app.initialize();
// register the controllers
app.register(HomeController);
app.register(InventoryController);
app.register(ItemsController);
// static caches loading
ItemDefinitionModule.load();
// start the application
app.listen(() =>
{

});