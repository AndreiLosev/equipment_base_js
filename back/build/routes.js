"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var test_foo = function (req, res) {
    res.json({
        name: req.params,
        metod: req.method,
    });
};
var routes = function (app) {
    app.get('/existing_tables ', test_foo);
    app.post('/create_new_table', test_foo);
    app.post('/create_new_castom_table', test_foo);
    app.get('/table/:table_name/:query', test_foo);
    app.post('/table/:table_name', test_foo);
    app.put('/table/:table_name', test_foo);
    app.delete('/table/:table_name', test_foo);
};
exports.routes = routes;
