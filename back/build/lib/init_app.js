"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_app = void 0;
const fs_1 = require("fs");
const sql_1 = require("./sql");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const init_app = (app_config_path) => {
    const { host, port, db_path, frontend, err_log_path, log_path, } = JSON.parse(fs_1.readFileSync(app_config_path).toString());
    create_log_file(log_path);
    create_log_file(err_log_path);
    const conn = new sql_1.DB(new better_sqlite3_1.default(db_path));
    return { conn, host, port, frontend, err_log_path, log_path };
};
exports.init_app = init_app;
const create_log_file = (path) => {
    try {
        const check_file = fs_1.readFileSync(path).toString();
        if (check_file.length > 0) {
            fs_1.writeFileSync(path, '');
        }
    }
    catch (err) {
        if (err.message.includes(`no such file or directory`))
            fs_1.writeFileSync(path, '');
        else
            throw err;
    }
};
