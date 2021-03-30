import sqlite, {Database} from 'better-sqlite3'
import {Result} from './result'
import {TEquipmentNumber, TEquipmentString} from '../models'

export class DB {
    constructor(
        private db: Database
    ) {}

    private get_columns_and_values_for_sql_query(data: TEquipmentNumber | TEquipmentString, id: "id_add" | 'id_remove') {
        const columns = id == 'id_remove'
            ? Object.keys(data).filter(i => i !== 'id')
            : [...Object.keys(data), 'id']
        const values = columns.map(i => `@${i}`)
        return {columns, values}
    }

    public get_tables() {
        try {
            const res = this.db.prepare<{name: string}[]>(`SELECT name FROM sqlite_master WHERE type='table'`)
                .all().map((i: {name: string}) => i.name)
                .filter(i => !((i == 'sqlite_sequence') || (i.includes('v_'))))
            return new Result(res)
        } catch (err) {
            return new Result<string[]>(err)
        }
    }

    public create_table(table_name: string) {
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
                `).run()
                this.db.prepare(`
                CREATE VIRTUAL TABLE v_${table_name} USING fts5(
                    id, doc_title, manufacturer, validation_place,
                    inventory_number, k_v_a, no_certificate, notes
                );
                `).run()
            })()
            return new Result(null)
        } catch (err) {
            return new Result<null>(err) //TODO
        }
    }

    public set_data(table_name: string, data: TEquipmentNumber, v_data: TEquipmentString) {
        try {
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            const insert = this.db.prepare(`INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})`)
            this.db.transaction(() => {
                const {lastInsertRowid} = insert.run(data)
                const {columns, values} = this.get_columns_and_values_for_sql_query(v_data, 'id_add')
                const v_data_with_id = Object.assign(v_data, {id: lastInsertRowid})
                this.db.prepare(`INSERT INTO v_${table_name} (${columns.toString()}) VALUES (${values.toString()})`)
                .run(v_data_with_id)
            })()
            return new Result(null)
        } catch (err) {
            return new Result<null>(err) //TODO
        }
    }

    public update_data(table_name: string, data: TEquipmentNumber, v_data: TEquipmentString) {
        try {
            
        } catch (error) {
            
        }
    }

//     public delete_data(table_name: string, data: TEquipment): Promise<void> {
//         return new Promise((resolve, reject) => {
//             const query = SqlQuery.delete_data(table_name, data)
//             this.db.run(query, err => err ? reject(err) : resolve())
//         })
//     }
}


export class SqlQuery {


    static set_data = (table_name: string, columns: string[], v_columns: string[]) => {
        const query = `INSERT INTO ${table_name} (${columns.toString()}) VALUES (${columns.map(i => `@${i}`).toString()})`
        const v_query = `INSERT INTO ${table_name} (${columns.toString()}) VALUES (${columns.map(i => `@${i}`).toString()})`
        return  
    }

    // static update_data = (table_name: string, data: TEquipment) => {
    //     const id = data.id
    //     const {columns, values} = TEquipment_to_columns_and_values_without_id(data)
    //     const result = columns.map((_, i) => `${columns[i]} = ${values[i]}`)
    //     return `UPDATE ${table_name} SET ${result.toString()} WHERE ${table_name}.id = ${id}`
    // }

    // static delete_data = (table_name: string, data: TEquipment) => {
    //     const id = data.id
    //     return `DELETE FROM ${table_name} WHERE ${table_name}.id = ${id};`
    // }
}