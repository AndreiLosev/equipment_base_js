"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs_1 = __importDefault(require("fs"));
class AppDB {
    constructor(db_file_path) {
        this.db = new sqlite3_1.default.Database(db_file_path, err => {
            if (err) {
                let file = fs_1.default.readFileSync('error_log.txt').toString();
                file += `${new Date(Date.now()).toLocaleDateString()} => Error: ${err}`;
                fs_1.default.writeFileSync('error_log.txt', file);
            }
        });
    }
}
