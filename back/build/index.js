"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var routes_1 = require("./routes");
var config = JSON.parse(fs_1.readFileSync('app_config.json').toString());
var app = express_1.default();
app.use(express_1.default.json());
// app.use(expres.static('front/build'))
routes_1.routes(app);
app.listen(config.port, config.host, function () {
    console.log("listen " + config.host + ":" + config.port);
});
