"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentTable = void 0;
class EquipmentTable {
}
exports.EquipmentTable = EquipmentTable;
EquipmentTable.sender = (res, sql_result, next) => {
    if (sql_result.isOk()) {
        res.status(200).json(sql_result.get_as_Ok());
        res.locals.last_send = sql_result.get_as_Ok();
    }
    else {
        res.status(500).json({ err: sql_result.get_as_Err().message });
        res.locals.last_send = sql_result.get_as_Err();
    }
    next();
};
EquipmentTable.create_table = (req, res, next) => {
    const conn = res.app.locals;
    EquipmentTable.sender(res, conn.create_table(req.query.table_name), next);
};
EquipmentTable.get_tabels = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    EquipmentTable.sender(res, conn.get_tables(), next);
};
EquipmentTable.get = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    EquipmentTable.sender(res, conn.get(req.query.table_name), next);
};
EquipmentTable.set = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    EquipmentTable.sender(res, conn.set(req.query.table_name, req.body), next);
};
EquipmentTable.update = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    EquipmentTable.sender(res, conn.update(req.query.table_name, req.body), next);
};
EquipmentTable.del = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    EquipmentTable.sender(res, conn.delete(req.query.table_name, req.body.id), next);
};
EquipmentTable.get_by_num = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    const { table_name, column, value, mode } = req.query;
    EquipmentTable.sender(res, conn.get_by_num(table_name, column, mode, value), next);
};
EquipmentTable.get_by_str = (req, res, next) => {
    const conn = req.app.locals.connect_db;
    const { table_name, column, pattern } = req.query;
    EquipmentTable.sender(res, conn.get_by_str(table_name, column, pattern), next);
};
