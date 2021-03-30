"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlQuery = exports.DB = void 0;
const result_1 = require("./result");
class DB {
    constructor(db) {
        this.db = db;
    }
    get_columns_and_values_for_sql_query(data, id) {
        const columns = id == 'id_remove'
            ? Object.keys(data).filter(i => i !== 'id')
            : [...Object.keys(data), 'id'];
        const values = columns.map(i => `@${i}`);
        return { columns, values };
    }
    get_tables() {
        try {
            const res = this.db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
                .all().map((i) => i.name)
                .filter(i => !((i == 'sqlite_sequence') || (i.includes('v_'))));
            return new result_1.Result(res);
        }
        catch (err) {
            return new result_1.Result(err);
        }
    }
    create_table(table_name) {
        try {
            this.db.transaction(() => {
                this.db.prepare(`
                CREATE TABLE ${table_name} (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "No"	INTEGER NOT NULL,
                    "validation_cost"	INTEGER,
                    "last_verification_date"	INTEGER,
                    "checking_manometers"	INTEGER,
                    "next_verification_date"	INTEGER,
                    "actual" INTEGER,
                    PRIMARY KEY("id" AUTOINCREMENT)
                    );
                `).run();
                this.db.prepare(`
                CREATE VIRTUAL TABLE v_${table_name} USING fts5(
                    id, doc_title, manufacturer, validation_place,
                    inventory_number, k_v_a, no_certificate, notes
                );
                `).run();
            })();
            return new result_1.Result(null);
        }
        catch (err) {
            return new result_1.Result(err); //TODO
        }
    }
    set_data(table_name, data, v_data) {
        try {
            const { columns, values } = this.get_columns_and_values_for_sql_query(data, 'id_remove');
            const insert = this.db.prepare(`INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})`);
            this.db.transaction(() => {
                const { lastInsertRowid } = insert.run(data);
                const { columns, values } = this.get_columns_and_values_for_sql_query(v_data, 'id_add');
                const v_data_with_id = Object.assign(v_data, { id: lastInsertRowid });
                this.db.prepare(`INSERT INTO v_${table_name} (${columns.toString()}) VALUES (${values.toString()})`)
                    .run(v_data_with_id);
            })();
            return new result_1.Result(null);
        }
        catch (err) {
            return new result_1.Result(err); //TODO
        }
    }
    update_data(table_name, data, v_data) {
        try {
        }
        catch (error) {
        }
    }
}
exports.DB = DB;
class SqlQuery {
}
exports.SqlQuery = SqlQuery;
SqlQuery.set_data = (table_name, columns, v_columns) => {
    const query = `INSERT INTO ${table_name} (${columns.toString()}) VALUES (${columns.map(i => `@${i}`).toString()})`;
    const v_query = `INSERT INTO ${table_name} (${columns.toString()}) VALUES (${columns.map(i => `@${i}`).toString()})`;
    return;
};
