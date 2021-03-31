"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const test_foo = (conn) => (req, res) => {
    res.json({
        name: req.params,
        metod: req.method,
    });
};
const routes = (app, conn) => {
    app.get('/existing_tables ', test_foo(conn));
    app.post('/create_new_table', test_foo(conn));
    app.post('/create_new_castom_table', test_foo(conn));
    app.get('/table/:table_name/:query', test_foo(conn));
    app.post('/table/:table_name', test_foo(conn));
    app.put('/table/:table_name', test_foo(conn));
    app.delete('/table/:table_name', test_foo(conn));
};
exports.routes = routes;
