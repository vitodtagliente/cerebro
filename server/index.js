"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cerebro_core_1 = require("cerebro-core");
const cerebro_logger_1 = require("cerebro-logger");
class FooController extends cerebro_core_1.Controller {
    register(router) {
        cerebro_logger_1.default.log("foo");
    }
}
const app = new cerebro_core_1.Application();
app.initialize();
app.register(FooController);
app.listen(() => {
});
//# sourceMappingURL=index.js.map