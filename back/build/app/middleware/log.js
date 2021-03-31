"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const promises_1 = require("fs/promises");
const logging = (try_path, catch_path) => async (req, res, next) => {
    if (res.statusCode === 200) {
        const text = {
            metod: req.method,
            Request_query: req.query,
            Request_body: req.body,
            Respons: res,
        };
        promises_1.appendFile(try_path, `${JSON.stringify(text)} \n`);
    }
    else {
        promises_1.appendFile(catch_path, `${res} \n`);
    }
    next();
};
exports.logging = logging;
