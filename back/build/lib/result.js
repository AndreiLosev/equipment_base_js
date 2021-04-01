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
    static try(fn) {
        try {
            return new Result(fn());
        }
        catch (err) {
            return new Result(err);
        }
    }
}
exports.Result = Result;
