"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentTable = void 0;
class EquipmentTable {
}
exports.EquipmentTable = EquipmentTable;
EquipmentTable.sender = (res, sql_result, next) => {
    if (sql_result.isOk())
        res.status(200).json(sql_result.get_as_Ok());
    else
        res.status(500).json({ err: sql_result.get_as_Err().message });
    if (next)
        next();
};
EquipmentTable.create_table = (conn) => (req, res, next) => {
    EquipmentTable.sender(res, conn.create_table(req.query.table_name), next);
};
EquipmentTable.get_tabels = (conn) => (req, res, next) => {
    EquipmentTable.sender(res, conn.get_tables(), next);
};
EquipmentTable.get = (conn) => (req, res, next) => {
    EquipmentTable.sender(res, conn.get(req.query.table_name), next);
};
EquipmentTable.set = (conn) => (req, res) => {
    EquipmentTable.sender(res, conn.set(req.query.table_name, req.body));
};
EquipmentTable.update = (conn) => (req, res) => {
    EquipmentTable.sender(res, conn.update(req.query.table_name, req.body));
};
EquipmentTable.del = (conn) => (req, res) => {
    EquipmentTable.sender(res, conn.delete(req.query.table_name, req.body.id));
};
EquipmentTable.get_by_num = (conn) => (req, res) => {
    const { table_name, column, value, mode } = req.query;
    EquipmentTable.sender(res, conn.get_by_num(table_name, column, mode, value));
};
EquipmentTable.get_by_str = (conn) => (req, res) => {
    const { table_name, column, pattern } = req.query;
    EquipmentTable.sender(res, conn.get_by_str(table_name, column, pattern));
};
