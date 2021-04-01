"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const promises_1 = require("fs/promises");
const logging = (try_path, catch_path) => async (req, res, next) => {
    const text = {
        time: new Date().toLocaleString(),
        metod: req.method,
        Request_query: req.query,
        Request_body: req.body,
    };
    try {
        if (res.statusCode <= 400) {
            await promises_1.appendFile(try_path, `${JSON.stringify({ ...text, Respons: res.locals.last_send })}\n`);
        }
        else {
            await promises_1.appendFile(catch_path, `${JSON.stringify({
                ...text,
                Respons: { err: res.locals.last_send.message },
            })}\n`);
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
