"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipments = void 0;
class Equipments {
}
exports.Equipments = Equipments;
Equipments.sender = (res, sql_result) => {
    if (sql_result.isOk())
        res.status(200).json(sql_result.get_as_Ok());
    else
        res.status(500).json({ err: sql_result.get_as_Err() });
};
Equipments.create_table = (conn) => (req, res) => {
    Equipments.sender(res, conn.create_table(req.query.table_name));
};
Equipments.get_tabels = (conn) => (req, res) => {
    Equipments.sender(res, conn.get_tables());
};
Equipments.get = (conn) => (req, res) => {
    Equipments.sender(res, conn.get(req.query.table_name));
};
Equipments.set = (conn) => (req, res) => {
    Equipments.sender(res, conn.set(req.query.table_name, req.body));
};
Equipments.update = (conn) => (req, res) => {
    Equipments.sender(res, conn.update(req.query.table_name, req.body));
};
Equipments.del = (conn) => (req, res) => {
    Equipments.sender(res, conn.delete(req.query.table_name, req.body.id));
};
Equipments.get_by_num = (conn) => (req, res) => {
    const { table_name, column, value, mode } = req.query;
    Equipments.sender(res, conn.get_by_num(table_name, column, mode, value));
};
Equipments.get_by_str = (conn) => (req, res) => {
    const { table_name, column, pattern } = req.query;
    Equipments.sender(res, conn.get_by_str(table_name, column, pattern));
};
