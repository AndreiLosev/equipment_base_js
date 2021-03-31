"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const equipments_1 = require("./app/controllers/equipments");
const routes = (app, conn) => {
    app.get('/existing_tables ', equipments_1.Equipments.get_tabels(conn));
    app.post('/create_new_table', equipments_1.Equipments.create_table(conn));
    app.get('/table/:table_name', equipments_1.Equipments.get(conn));
    app.post('/table/:table_name', equipments_1.Equipments.set(conn));
    app.put('/table/:table_name', equipments_1.Equipments.update(conn));
    app.delete('/table/:table_name', equipments_1.Equipments.del(conn));
    app.get('/table/from_num/:query', equipments_1.Equipments.get_by_num(conn));
    app.get('/table/from_str/:query', equipments_1.Equipments.get_by_str(conn));
};
exports.routes = routes;
