"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlQuery = exports.DB = void 0;
var DB = /** @class */ (function () {
    function DB(db) {
        this.db = db;
    }
    DB.prototype.get_tables = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = SqlQuery.get_tables();
            _this.db.all(query, function (err, result) { return err
                ? reject(err)
                : resolve(result.filter(function (i) { return i.name !== 'sqlite_sequence'; }).map(function (i) { return i.name; })); });
        });
    };
    DB.prototype.create_table = function (table_name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = SqlQuery.create_table(table_name);
            _this.db.run(query, function (err) { return err ? reject(err) : resolve(); });
        });
    };
    DB.prototype.set_data = function (table_name, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = SqlQuery.set_data(table_name, data);
            _this.db.run(query, function (err) { return err ? reject(err) : resolve(); });
        });
    };
    DB.prototype.update_data = function (table_name, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = SqlQuery.update_data(table_name, data);
            _this.db.run(query, function (err) { return err ? reject(err) : resolve(); });
        });
    };
    DB.prototype.delete_data = function (table_name, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = SqlQuery.delete_data(table_name, data);
            _this.db.run(query, function (err) { return err ? reject(err) : resolve(); });
        });
    };
    return DB;
}());
exports.DB = DB;
var SqlQuery = /** @class */ (function () {
    function SqlQuery() {
    }
    SqlQuery.get_tables = function () { return "SELECT name FROM sqlite_master WHERE type=\"table\""; };
    SqlQuery.create_table = function (table_name) { return "\n    CREATE TABLE " + table_name + " (\n        \"id\"\tINTEGER NOT NULL UNIQUE,\n        \"No\"\tINTEGER NOT NULL,\n        \"doc_title\"\tTEXT NOT NULL,\n        \"manufacturer\"\tTEXT,\n        \"validation_place\"\tTEXT,\n        \"validation_cost\"\tINTEGER,\n        \"inventory_number\"\tTEXT NOT NULL,\n        \"k_v_a\"\tTEXT,\n        \"no_certificate\"\tTEXT,\n        \"last_verification_date\"\tINTEGER,\n        \"checking_manometers\"\tINTEGER,\n        \"next_verification_date\"\tINTEGER,\n        \"notes\"\tTEXT,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    );\n    "; };
    SqlQuery.set_data = function (table_name, data) {
        var _a = TEquipment_to_columns_and_values_without_id(data), columns = _a.columns, values = _a.values;
        return "INSERT INTO " + table_name + " (" + columns.toString() + ") VALUES (" + values.toString() + ")";
    };
    SqlQuery.update_data = function (table_name, data) {
        var id = data.id;
        var _a = TEquipment_to_columns_and_values_without_id(data), columns = _a.columns, values = _a.values;
        var result = columns.map(function (_, i) { return columns[i] + " = " + values[i]; });
        return "UPDATE " + table_name + " SET " + result.toString() + " WHERE " + table_name + ".id = " + id;
    };
    SqlQuery.delete_data = function (table_name, data) {
        var id = data.id;
        return "DELETE FROM " + table_name + " WHERE " + table_name + ".id = " + id + ";";
    };
    return SqlQuery;
}());
exports.SqlQuery = SqlQuery;
var TEquipment_to_columns_and_values_without_id = function (data) {
    var columns = Object.keys(data).filter(function (i) { return i !== 'id'; });
    var id_index = Object.keys(data).indexOf('id');
    var values = Object.values(data).filter(function (_, i) { return i !== id_index; });
    return { columns: columns, values: values };
};
