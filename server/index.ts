import { Application, Log } from "cerebro-core";
import HomeController from "./controllers/home_controller";
import InventoryController from "./controllers/inventory_controller";
import ItemsController from "./controllers/items_controller";
import Database from "./database";
import ItemDefinitionModule from "./modules/item_definition_module";
import config from "./config";
import UserModule from "./modules/user_module";

Database.main.connect(config.database.connection, config.database.name)
    .then(status =>
    {
        const app: Application = new Application(config);
        app.initialize();
        // register the controllers
        app.register(HomeController);
        app.register(InventoryController);
        app.register(ItemsController);
        // static caches loading
        ItemDefinitionModule.load();
        // start the application
        app.listen(async () =>
        {
            console.log(await new UserModule().all());
        });
    })
    .catch(error => Log.Logger.error(`Unable to contact the DB ${config.database.name} at ${config.database.connection}`));