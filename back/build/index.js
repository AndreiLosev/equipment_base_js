"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_app_1 = require("./lib/init_app");
const routes_1 = require("./routes");
const shutdown_1 = require("./lib/shutdown");
const log_1 = require("./app/middleware/log");
const { conn, frontend, log_path, err_log_path, host, port } = init_app_1.init_app('app_config.json');
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static(frontend));
routes_1.routes(app);
app.locals.connect_db = conn;
app.use(log_1.logging(log_path, err_log_path));
const server = app.listen(port, host, () => {
    console.log(`listen ${host}:${port}`);
});
shutdown_1.shutdown(server, conn);
