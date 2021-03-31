"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_app = void 0;
const fs_1 = require("fs");
const init_app = (app_config_path) => {
    const config = JSON.parse(fs_1.readFileSync('app_config.json').toString());
    create_log_file(config.log_path);
    create_log_file(config.err_log_path);
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
