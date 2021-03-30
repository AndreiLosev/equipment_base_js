import sqlite, {Database} from 'better-sqlite3'
import {Result} from './result'
import {TEquipmentNumber, TEquipmentString} from '../models'

export class DB {
    constructor(
        private db: Database
    ) {}

    private get_columns_and_values_for_sql_query(
        data: TEquipmentNumber | TEquipmentString, id: "id_add" | 'id_remove' | 'nothing',
    ) {
        const columns = id == 'id_remove'
            ? Object.keys(data).filter(i => i !== 'id')
            : id == 'id_add' ? [...Object.keys(data), 'id'] : Object.keys(data)
        const values = columns.map(i => `@${i}`)
        return {columns, values}
    }

    public get_tables() {
        return Result.try<string[]>(() => {
            return this.db.prepare<{name: string}[]>(`SELECT name FROM sqlite_master WHERE type='table'`)
                .all().map((i: {name: string}) => i.name)
                .filter(i => !((i == 'sqlite_sequence') || (i.includes('v_'))))
            })

    }

    public create_table(table_name: string) {
        return Result.try(() => {
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
                `).run()
                this.db.prepare(`
                CREATE VIRTUAL TABLE v_${table_name} USING fts5(
                    id, doc_title, manufacturer, validation_place,
                    inventory_number, k_v_a, no_certificate, notes
                );
                `).run()
            })()
            return {}
        })
    }

    public set(table_name: string, data: TEquipmentNumber, v_data: TEquipmentString) {
        return Result.try(() => {
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            const insert = this.db.prepare(`INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})`)
            this.db.transaction(() => {
                const {lastInsertRowid} = insert.run(data)
                const {columns, values} = this.get_columns_and_values_for_sql_query(v_data, 'id_add')
                const v_data_with_id = Object.assign(v_data, {id: lastInsertRowid})
                this.db.prepare(`INSERT INTO v_${table_name} (${columns.toString()}) VALUES (${values.toString()})`)
                    .run(v_data_with_id)
            })()
            return {}
        })
    }

    public update(table_name: string, data: TEquipmentNumber, v_data: TEquipmentString) {
        return Result.try(() => {
            const id = data.id
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            const for_query = columns.map((_, i) => `${columns[i]} = ${values[i]}`)
            const insert = this.db.prepare(`UPDATE ${table_name} SET ${for_query.toString()} WHERE ${table_name}.id = ${id}`)
            this.db.transaction(() => {
                insert.run(data)
                const {columns, values} = this.get_columns_and_values_for_sql_query(v_data, 'nothing')
                const for_query = columns.map((_, i) => `${columns[i]} = ${values[i]}`)
                this.db.prepare(`UPDATE v_${table_name} SET ${for_query.toString()} WHERE v_${table_name}.id = ${id}`)
                    .run(v_data)
            })()
            return {}
        })
    }

    public delete(table_name: string, id: number) {
        return Result.try(() => {
            this.db.transaction(() => {
                this.db.prepare(`DELETE FROM ${table_name} WHERE ${table_name}.id = ${id};`).run()
                this.db.prepare(`DELETE FROM v_${table_name} WHERE v_${table_name}.id = ${id};`).run()
            })()
            return {}
        })
    }

    public search_by_integer(table_name: string, mode: '<=' | '>=' | '=', column: string, value: number) {
        return Result.try(() => {
            // SELECT * FROM test_table JOIN v_test_table ON test_table.id = v_test_table.id and test_table.id > 7
            this.db.transaction(() => {
                const result = this.db.prepare(`SELECT * FROM ${table_name} WHERE ${table_name}.${column} ${mode} ${value}`)
                    .all() as TEquipmentNumber[]                
            })
        })
    }

    public search_by_string(table_name: string, pattern: string, column: string) {}
}
