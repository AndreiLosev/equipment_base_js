"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const routes_1 = require("./routes");
const sql_1 = require("./lib/sql");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const log_1 = require("./app/middleware/log");
const config = JSON.parse(fs_1.readFileSync('app_config.json').toString());
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static(config.frontend));
routes_1.routes(app, new sql_1.DB(new better_sqlite3_1.default(config.db_path)));
app.use(log_1.logging(config.log_path, config.err_log_path));
app.listen(config.port, config.host, () => {
    console.log(`listen ${config.host}:${config.port}`);
});
