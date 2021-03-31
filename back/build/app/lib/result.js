"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(value) {
        this.value = value;
    }
    isOk() { return !(this.value instanceof Error); }
    get_as_Ok() { return this.value; }
    get_as_Err() { return this.value; }
    static try(fn, try_log, catch_log) {
        try {
            if (try_log)
                try_log();
            return new Result(fn());
        }
        catch (err) {
            if (catch_log)
                catch_log();
            return new Result(err);
        }
    }
}
exports.Result = Result;
