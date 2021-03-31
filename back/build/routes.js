"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const equipmentTable_1 = require("./app/controllers/equipmentTable");
const routes = (app, conn) => {
    app.get('/existing_tables ', equipmentTable_1.EquipmentTable.get_tabels(conn));
    app.post('/create_new_table', equipmentTable_1.EquipmentTable.create_table(conn));
    app.get('/table/:table_name', equipmentTable_1.EquipmentTable.get(conn));
    app.post('/table/:table_name', equipmentTable_1.EquipmentTable.set(conn));
    app.put('/table/:table_name', equipmentTable_1.EquipmentTable.update(conn));
    app.delete('/table/:table_name', equipmentTable_1.EquipmentTable.del(conn));
    app.get('/table/from_num/:query', equipmentTable_1.EquipmentTable.get_by_num(conn));
    app.get('/table/from_str/:query', equipmentTable_1.EquipmentTable.get_by_str(conn));
};
exports.routes = routes;