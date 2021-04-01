"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const promises_1 = require("fs/promises");
const logging = (try_path, catch_path) => async (req, res, next) => {
    try {
        if (res.statusCode === 200) {
            const text = {
                time: new Date().toLocaleString(),
                metod: req.method,
                Request_query: req.query,
                Request_body: req.body,
            };
            await promises_1.appendFile(try_path, `${JSON.stringify(text)}\n`);
            console.log(text);
        }
        else {
            const text = {
                time: new Date().toLocaleString(),
                ...res,
            };
            await promises_1.appendFile(catch_path, `${JSON.stringify(text)}\n`);
        }
    }
    catch (err) {
        console.log('err:', err);
    }
    finally {
        next();
    }
};
exports.logging = logging;
