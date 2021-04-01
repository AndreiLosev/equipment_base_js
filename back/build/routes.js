"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const equipmentTable_1 = require("./app/controllers/equipmentTable");
const routes = (app) => {
    app.get('/existing_tables', equipmentTable_1.EquipmentTable.get_tabels);
    app.post('/create_new_table', equipmentTable_1.EquipmentTable.create_table);
    app.get('/table', equipmentTable_1.EquipmentTable.get);
    app.post('/table', equipmentTable_1.EquipmentTable.set);
    app.put('/table', equipmentTable_1.EquipmentTable.update);
    app.delete('/table', equipmentTable_1.EquipmentTable.del);
    app.get('/table/from_num', equipmentTable_1.EquipmentTable.get_by_num);
    app.get('/table/from_str', equipmentTable_1.EquipmentTable.get_by_str);
};
exports.routes = routes;
