import { ApplicationConfig } from "cerebro-core";

const config: ApplicationConfig = new ApplicationConfig;
config.database.name = "webrpg";
config.database.connection = "mongodb://localhost:27017";
config.database.type = "mongodb";

export default config;