"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const result_1 = require("./result");
class DB {
    constructor(db) {
        this.db = db;
    }
    get_columns_and_values_for_sql_query(data, id) {
        const columns = id == 'id_remove'
            ? Object.keys(data).filter(i => i !== 'id')
            : id == 'id_add' ? [...Object.keys(data), 'id'] : Object.keys(data);
        const values = columns.map(i => `@${i}`);
        return { columns, values };
    }
    get_tables() {
        return result_1.Result.try(() => {
            return this.db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
                .all().map((i) => i.name)
                .filter(i => !(i == 'sqlite_sequence'));
        });
    }
    create_table(table_name) {
        return result_1.Result.try(() => {
            this.db.prepare(`
                CREATE TABLE ${table_name} (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "No"	INTEGER NOT NULL,
                    "validation_cost"	INTEGER,
                    "last_verification_date"	INTEGER,
                    "checking_manometers"	INTEGER,
                    "next_verification_date"	INTEGER,
                    "actual" INTEGER,
                    "doc_title" TEXT NOT NULL,
                    "manufacturer" TEXT,
                    "validation_place" TEXT,
                    "inventory_number" TEXT NOT NULL,
                    "k_v_a" TEXT,
                    "no_certificate" TEXT,
                    "notes" TEXT,
                    PRIMARY KEY("id" AUTOINCREMENT)
                    );
                `).run();
            return {};
        });
    }
    set(table_name, data) {
        return result_1.Result.try(() => {
            const { columns, values } = this.get_columns_and_values_for_sql_query(data, 'id_remove');
            this.db.prepare(`INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})`).run(data);
            return {};
        });
    }
    update(table_name, data) {
        return result_1.Result.try(() => {
            const id = data.id;
            const { columns, values } = this.get_columns_and_values_for_sql_query(data, 'id_remove');
            const for_query = columns.map((_, i) => `${columns[i]} = ${values[i]}`);
            let x = this.db.prepare(`UPDATE ${table_name} SET ${for_query.toString()} WHERE ${table_name}.id = ${id}`).run(data);
            return {};
        });
    }
    delete(table_name, id) {
        return result_1.Result.try(() => {
            this.db.prepare(`DELETE FROM ${table_name} WHERE ${table_name}.id = ${id};`).run();
            return {};
        });
    }
    get_by_num(table_name, column, mode, value) {
        return result_1.Result.try(() => {
            return this.db.prepare(`SELECT * FROM ${table_name} WHERE  ${table_name}.${column} ${mode} ${value}`).all();
        });
    }
    get_by_str(table_name, column, pattern) {
        return result_1.Result.try(() => {
            console.log({ pattern });
            return this.db.prepare(`SELECT * FROM ${table_name} WHERE ${table_name}.${column} like '%${pattern}%'`).all();
        });
    }
}
exports.DB = DB;
